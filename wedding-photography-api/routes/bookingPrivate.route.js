import express from 'express'
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getAllBookingsByToken
} from '../controllers/booking.controller.js'

const router = express.Router()

// Routes for booking operations
router.post('/', createBooking) // Create a new booking
router.put('/:id', updateBooking) // Update a booking by ID
router.delete('/:id', deleteBooking) // Delete a booking by ID
router.get('/get-my-bookings', getAllBookingsByToken) // Get all bookings for the authenticated user

export const bookingPrivateRoutes = router
