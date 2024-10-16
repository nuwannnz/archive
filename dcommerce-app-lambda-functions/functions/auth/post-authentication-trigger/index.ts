import { PostAuthenticationTriggerHandler } from "aws-lambda";
import { CognitoIdentityServiceProvider, Lambda } from "aws-sdk";

const cognito = new CognitoIdentityServiceProvider();
const lambdaClient = new Lambda({ region: process.env.AWS_REGION });

export const handler: PostAuthenticationTriggerHandler = async (event) => {
  console.log("*** event", event);
  try {
    if (event.request.userAttributes.email_verified !== "true") {
      const params: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest =
        {
          UserPoolId: event.userPoolId,
          UserAttributes: [
            {
              Name: "email_verified",
              Value: "true",
            },
            {
              Name: "custom:userRole",
              Value: process.env.CUSTOMER_USER_ROLE,
            },
          ],
          Username: event.userName!,
        };
      console.log("Marked user email as verified");
      await cognito.adminUpdateUserAttributes(params).promise();

      // create user in dynamodb
      const createUserPayload = {
        userSub: event.request.userAttributes.sub,
        domainId: event.request.userAttributes["custom:userDomain"],
        userRoleId: process.env.CUSTOMER_USER_ROLE,
      };

      await lambdaClient
        .invoke({
          FunctionName: process.env.CREATE_USER_LAMBDA_FUNC_NAME as string,
          Payload: JSON.stringify({ body: JSON.stringify(createUserPayload) }),
        })
        .promise();
    }
  } catch (error) {
    console.log("post-authentication-error", error);
  }

  return event;
};
