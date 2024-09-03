const express = require('express');
const router = express.Router();
const {
  addBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  getAllBookings
} = require('../controllers/bookingController');

// Route to add a booking
router.post('/add', addBooking);

// Route to get a booking by ID
router.get('/:id', getBooking);

// Route to update a booking by ID
router.put('/:id', updateBooking);

// Route to delete a booking by ID
router.delete('/:id', deleteBooking);

// Route to get all bookings
router.get('/', getAllBookings);

module.exports = router;
