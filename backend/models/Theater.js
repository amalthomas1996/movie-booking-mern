const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define theater schema
const theaterSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  amenities: [String],
  totalSeats: { type: Number, required: true },
});

// Create and export Theater model
module.exports = mongoose.model('Theater', theaterSchema);
