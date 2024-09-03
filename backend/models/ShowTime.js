const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define seat schema
const seatSchema = new Schema({
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

// Define showtime schema
const showtimeSchema = new Schema({
  theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showtime: { type: Date, required: true },
  seats: [seatSchema],
});

// Create and export Showtime model
module.exports = mongoose.model('Showtime', showtimeSchema);
