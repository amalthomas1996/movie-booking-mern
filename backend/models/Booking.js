const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define booking schema
const bookingSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  seats: [{ type: String, required: true }],
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  paymentInfo: {
    paymentMethod: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  },
  bookingDate: { type: Date, default: Date.now },
});

// Create and export Booking model
module.exports = mongoose.model('Booking', bookingSchema);
