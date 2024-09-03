const express = require('express');
const router = express.Router();
const {
  addShowTime,
  getShowTime,
  updateShowTime,
  deleteShowTime,
  getAllShowTimes
} = require('../controllers/showTimeController');

// Route to add a showtime
router.post('/add', addShowTime);

// Route to get a showtime by ID
router.get('/:id', getShowTime);

// Route to update a showtime by ID
router.put('/:id', updateShowTime);

// Route to delete a showtime by ID
router.delete('/:id', deleteShowTime);

// Route to get all showtimes
router.get('/', getAllShowTimes);

module.exports = router;
