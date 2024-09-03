
const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date },
  rating: { type: Number, min: 0, max: 10 },
  image: { type: String },
  duration: { type: Number, required: true },
  genre: [String],
});

module.exports = mongoose.model('Movie', movieSchema);
