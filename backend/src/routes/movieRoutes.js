const express = require('express');
const router = express.Router();
const {
  addMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  getAllMovies
} = require('../controllers/movieController');

// Route to add a movie
router.post('/add', addMovie);

// Route to get a movie by ID
router.get('/:id', getMovie);

// Route to update a movie by ID
router.put('/:id', updateMovie);

// Route to delete a movie by ID
router.delete('/:id', deleteMovie);

// Route to get all movies
router.get('/', getAllMovies);

module.exports = router;
