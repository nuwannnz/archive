import { CognitoJwtVerifier } from "aws-jwt-verify";
import { MongoClient, ObjectId } from "mongodb";

const dbAuth = `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`;

const mongoUri = `mongodb+srv://${dbAuth}@dcommerce-dev.byv8x.mongodb.net/dcommerce_dev?retryWrites=true&w=majority`;
const dbClient = new MongoClient(mongoUri);

const db = dbClient.db("dcommerce_dev");
const userTbl = db.collection("users");

interface ICachedUser {
  _id: string;
  userSub: string;
  domainId: ObjectId;
  userRoleId: ObjectId;
  domain: any;
  userRole: any;
}
const cachedUserData: ICachedUser[] = [];

const getUser = async (
  userSub: string,
  domainId: string
): Promise<ICachedUser | null> => {
  const cachedUser = cachedUserData.find(
    (user) => user.userSub === userSub && user.domainId.equals(domainId)
  );

  if (cachedUser) {
    console.log("==== returning cached user");
    return cachedUser;
  }

  // connect to db and retrieve
  const query = [
    {
      $match: {
        userSub,
      },
    },
    {
      $lookup: {
        from: "domains",
        localField: "domainId",
        foreignField: "_id",
        as: "domain",
      },
    },
    {
      $lookup: {
        from: "userroles",
        localField: "userRoleId",
        foreignField: "_id",
        as: "userRole",
      },
    },
  ];
  const userCursor = userTbl.aggregate(query);

  for await (const u of userCursor) {
    const userObj: ICachedUser = {
      ...(u as ICachedUser),
      domain: u.domain.pop(),
      userRole: u.userRole.pop(),
    };
    cachedUserData.push(userObj as ICachedUser);
    return userObj;
  }

  return null;
};

// for testing
// getUser(
//   "c5140000-f077-4ae1-8269-4382f1e7cf26",
//   "64057c21ac37b3dc55606530"
// ).then((u) => console.log(u));

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID ?? "",
  tokenUse: "id",
  clientId: process.env.COGNITO_CLIENT_ID,
});

// Help function to generate an IAM policy
const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
) => {
  const authResponse: any = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument: any = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];

    const statementOne: any = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

export const handler = async (event: any) => {
  console.log("*** event", event);
  try {
    const idToken = event.headers["Authorization"];

    if (!idToken) {
      throw new Error();
    }

    const payload = await verifier.verify(idToken);
    console.log("Token is valid. Payload:", payload);

    // custom validation
    const domain = payload["custom:userDomain"];
    const role = payload["custom:userRole"];
    const userSub = payload.sub;

    // fetch and validate user
    const user = await getUser(userSub, domain as string);

    if (!user) {
      throw new Error("Invalid user");
    }

    // validate domain
    if (Boolean(process.env.VALIDATE_REQUEST_ORIGIN)) {
      const requestOrigin = event.headers["origin"] ?? "";
      let formattedOrigin = requestOrigin.replace("https://", "");
      formattedOrigin = formattedOrigin.split("/").shift() ?? "";

      if (!formattedOrigin) {
        throw new Error("Invalid origin header");
      }

      if (formattedOrigin !== user.domain.name) {
        throw new Error("Invalid origin");
      }
    }

    // validate permissions
    if (
      !user.userRole.permissions.includes(
        `${event.httpMethod}:${event.resource}`
      )
    ) {
      throw new Error("Invalid permission");
    }

    const response = {
      ...generatePolicy("dcommerce-api", "Allow", event.methodArn),
      context: {
        userId: user._id,
        userSub: user.userSub,
        userRole: role,
        userDomain: domain,
      },
    };

    return response;
  } catch (e) {
    console.log("error", e);
    console.log("Token not valid!");
    throw new Error("Unauthorized");
  }
};
