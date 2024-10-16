// Importing the Booking model and logger
import { BookingModal } from '../modals/booking.modal.js'
import { DomainModal } from '../modals/domain.modal.js'
import { logger } from '../utils/logger.js'

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    if (!req.customDomainId) {
      return res.status(400).json({ message: 'Domain ID is required' })
    }
    const domainExists = await DomainModal.findOne({ _id: req.customDomainId, isActive: true })
    if (!domainExists) {
      return res.status(404).json({ message: 'Domain not found' })
    }
    const bookingData = {
      ...req.body,
      domain: req.customDomainId
    }
    const newBooking = await BookingModal.create(bookingData)
    logger.info(`Booking created with id: ${newBooking._id}`)
    return res.json(newBooking)
  } catch (error) {
    logger.error(`Error creating booking: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModal.find().where({ domain: req.params.id, isActive: true })
    return res.json(bookings)
  } catch (error) {
    logger.error(`Error fetching bookings: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Get all bookings by token
export const getAllBookingsByToken = async (req, res) => {
  try {
    const bookings = await BookingModal.find().where({ domain: req.customDomainId, isActive: true })
    return res.json(bookings)
  } catch (error) {
    logger.error(`Error fetching bookings: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)
    const booking = await BookingModal.findOne({
      _id: req.params.id,
      isActive: true
    })
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    return res.json(booking)
  } catch (error) {
    logger.error(`Error fetching booking: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Update a booking
export const updateBooking = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)
    const updatedBooking = await BookingModal.findOneAndUpdate(
      { _id: req.params.id, isActive: true, domain: req.customDomainId },
      req.body,
      { new: true })
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    return res.json(updatedBooking)
  } catch (error) {
    logger.error(`Error updating booking: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)
    const updatedBooking = await BookingModal.findOneAndUpdate(
      { _id: req.params.id, isActive: true, domain: req.customDomainId },
      { isActive: false },
      { new: true }
    )
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    return res.status(204).send()
  } catch (error) {
    logger.error(`Error deleting booking: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}
