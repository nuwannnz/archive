import express from 'express'
import { getAllBookings, getBookingById } from '../controllers/booking.controller.js'

const router = express.Router()

// Routes for public booking operations
router.get('/by-domain/:id', getAllBookings) // Get all bookings for a specific domain
router.get('/:id', getBookingById) // Get a specific booking by its ID

export const bookingPublicRoutes = router
