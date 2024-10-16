import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { domainPrivateRoutes } from './routes/domainPrivate.routes.js'
import { bookingPrivateRoutes } from './routes/bookingPrivate.route.js'
import { domainPublicRoutes } from './routes/domainPublic.route.js'
import { bookingPublicRoutes } from './routes/bookingPublic.route.js'
import { logger } from './utils/logger.js'

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.path}`)
  next()
})

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*')
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', '*')
  next()
})

app.use((req, res, next) => {
  if (req.path.includes('private')) {
    req.customDomainId = req.headers['custom-domain-id']
    req.userEmail = req.headers['user-email']
  }
  next()
})

try {
  logger.info('==> creating db client')
  await mongoose.connect(
    process.env.MONGODB_URI
  )
} catch (error) {
  logger.error('Failed to connect to the database', error)
  process.exit(1)
}

// Using the routes
app.use('/api/domains/public', domainPublicRoutes)
app.use('/api/domains/private', domainPrivateRoutes)
app.use('/api/bookings/public', bookingPublicRoutes)
app.use('/api/bookings/private', bookingPrivateRoutes)

export const expressApp = app
