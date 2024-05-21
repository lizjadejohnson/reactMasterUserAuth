const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true }, //Ensures the email is unique in the database
  created_at: { type: Date, default: Date.now }
  // Add additional fields as needed
});

const User = mongoose.model('User', userSchema);
module.exports = User;
