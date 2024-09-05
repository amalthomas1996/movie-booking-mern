const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, default: null },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isTwoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
});



module.exports = mongoose.model('User', userSchema);
