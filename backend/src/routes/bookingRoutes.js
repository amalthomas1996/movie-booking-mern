const express = require('express');
const { createBooking, getBooking, updateBooking, deleteBooking, getAllBookings } = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Define routes
router.post('/', authenticateToken, createBooking);
router.get('/:id', authenticateToken, getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/', getAllBookings);

module.exports = router;
