const express = require('express');
const { createBooking, getBooking, updateBooking, deleteBooking, getAllBookings } = require('../controllers/bookingController');
const router = express.Router();

// Define routes
router.post('/', createBooking);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/', getAllBookings);

module.exports = router;
