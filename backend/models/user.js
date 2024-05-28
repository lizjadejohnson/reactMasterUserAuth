const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, //Ensure the username is unique
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true }, //Ensure the email is unique
  dob: { type: String, required: true }, 
}, {timestamps: true});

// Hash password before saving:
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
