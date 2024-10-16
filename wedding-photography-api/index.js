import { createServer, proxy } from 'aws-serverless-express'
import { expressApp } from './app.js'

// Create a server from the Express app
const server = createServer(expressApp)

export const handler = (event, context) => {
  console.log('HTTP Method:', event.httpMethod)
  console.log('Path:', event.path)
  console.log(JSON.stringify(event, null, 2))

  if (event.path.includes('private')) {
    const customDomainId = event.requestContext.authorizer.claims['custom:domain_id']
    const userEmail = event.requestContext.authorizer.claims.email

    event.headers['custom-domain-id'] = customDomainId
    event.headers['user-email'] = userEmail
  }
  // Proxy the event to the Express app
  return proxy(server, event, {
    ...context,
    succeed: (response) => context.succeed(response)
  })
}
