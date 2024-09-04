const express = require('express');
const router = express.Router();
const { addShowtime, getShowtimes, getShowtimeById, deleteShowtime, updateShowtime } = require('../controllers/showTimeController');

// Routes
router.post('/add', addShowtime); // Add new showtime
router.get('/', getShowtimes); // Get all showtimes
router.put('/:id', updateShowtime); // Update showtime by ID
router.get('/:id', getShowtimeById); // Get a single showtime by ID
router.delete('/:id', deleteShowtime); // Delete a showtime

module.exports = router;
