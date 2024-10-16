const { Stack } = require("aws-cdk-lib");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const {
  RestApi,
  LambdaIntegration,
  CfnAuthorizer,
} = require("aws-cdk-lib/aws-apigateway");
const { UserPool } = require("aws-cdk-lib/aws-cognito");
class ArtistPortfolioBackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // Lambda functions
    const createDomainLambda = new Function(this, "CreateDomainLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "create-domain.handler",
      code: Code.fromAsset("./dist/create-domain"),
    });

    const updateDomainLambda = new Function(this, "UpdateDomainLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "update-domain.handler",
      code: Code.fromAsset("./dist/update-domain"),
    });

    const deleteDomainLambda = new Function(this, "DeleteDomainLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "delete-domain.handler",
      code: Code.fromAsset("./dist/delete-domain"),
    });

    // API Gateway
    const api = new RestApi(this, "ArtistPortfolioAPI");

    // Integration with Lambda functions
    const createDomainIntegration = new LambdaIntegration(createDomainLambda, {
      proxy: true,
    });
    const updateDomainIntegration = new LambdaIntegration(updateDomainLambda, {
      proxy: true,
    });
    const deleteDomainIntegration = new LambdaIntegration(deleteDomainLambda, {
      proxy: true,
    });

    // API Gateway Resources and Methods
    const createDomainResource = api.root.addResource("create-domain");
    const updateDomainResource = api.root.addResource("update-domain");
    const deleteDomainResource = api.root.addResource("delete-domain");

    // createDomainResource.addMethod("POST", createDomainIntegration);
    // updateDomainResource.addMethod("POST", updateDomainIntegration);
    // deleteDomainResource.addMethod("POST", deleteDomainIntegration);

    // Cognito User Pool
    const userPool = new UserPool(this, "ArtistPortfolioAPIUsers", {
      selfSignUpEnabled: false,
    });

    // Cognito User Pool Authorizer
    const authorizer = new CfnAuthorizer(this, "ArtistPortfolioAuthorizer", {
      restApiId: api.restApiId,
      name: "CognitoAuthorizer",
      type: "COGNITO_USER_POOLS",
      identitySource: "method.request.header.Authorization",
      providerArns: [userPool.userPoolArn],
    });

    // Connect Authorizer to API Gateway Methods
    const createDomainMethod = createDomainResource.addMethod(
      "POST",
      createDomainIntegration
    );
    createDomainMethod.node.addDependency(authorizer);

    const updateDomainMethod = updateDomainResource.addMethod(
      "POST",
      updateDomainIntegration
    );
    updateDomainMethod.node.addDependency(authorizer);

    const deleteDomainMethod = deleteDomainResource.addMethod(
      "POST",
      deleteDomainIntegration
    );
    deleteDomainMethod.node.addDependency(authorizer);
  }
}

module.exports = { ArtistPortfolioBackendStack };
