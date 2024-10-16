import express from 'express'
import { getAllDomains, getDomainById, sendContactEmail } from '../controllers/domain.controller.js'

const router = express.Router()

// Routes for domain operations
router.post('/contact-us/:id', sendContactEmail) // send contact email request
router.get('/', getAllDomains) // Get all domains
router.get('/:id', getDomainById) // Get a specific domain by its ID

export const domainPublicRoutes = router
