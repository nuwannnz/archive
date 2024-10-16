export interface ProxyEvent<P, Q> {
  body: string;
  pathParameters: P;
  queryStringParameters: Q;
  headers: {
    'x-domain': string;
  };
}

export interface ProxyEventWithAuthorizerData<P, Q> extends ProxyEvent<P, Q> {
  requestContext: {
    authorizer: {
      userDomain: string;
      userRole: string;
      userId: string;
      userSub: string;
    };
  };
}
