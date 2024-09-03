const express = require('express');
const router = express.Router();
const {
  addTheater,
  getTheaterById,
  updateTheater,
  deleteTheater,
  getAllTheaters
} = require('../controllers/theaterController');

// Route to add a theater
router.post('/add', addTheater);

// Route to get a theater by ID
router.get('/:id', getTheaterById);

// Route to update a theater by ID
router.put('/:id', updateTheater);

// Route to delete a theater by ID
router.delete('/:id', deleteTheater);

// Route to get all theaters
router.get('/', getAllTheaters);

module.exports = router;
