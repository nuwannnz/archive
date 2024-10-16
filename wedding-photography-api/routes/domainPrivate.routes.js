import express from 'express'
import { createDomain, updateDomain, deleteDomain, getDomainByToken } from '../controllers/domain.controller.js'

const router = express.Router()

/** Private Routes for domain operations */

router.post('/', createDomain) // Create a new domain
router.patch('/update-my-domain', updateDomain) // Update the authenticated user's domain
router.get('/get-my-domain', getDomainByToken) // Get the authenticated user's domain
router.delete('/:id', deleteDomain) // Delete a specific domain by ID

export const domainPrivateRoutes = router
