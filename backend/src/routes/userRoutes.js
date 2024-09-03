const express = require('express');
const router = express.Router();
const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../controllers/userController');

// Route to register a user
router.post('/register', registerUser);

// Route to get a user by ID
router.get('/:id', getUser);

// Route to update a user by ID
router.put('/:id', updateUser);

// Route to delete a user by ID
router.delete('/:id', deleteUser);

// Route to get all users
router.get('/', getAllUsers);

module.exports = router;
