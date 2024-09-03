const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isTwoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
});

// Create and export User model
module.exports = mongoose.model('User', userSchema);
