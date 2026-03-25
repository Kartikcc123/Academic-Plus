const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Inside backend/models/Admin.js
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Director' // Added a name field
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    index: true // Add index for faster queries
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    select: false
  }
}, { timestamps: true });

// Index for faster login queries (removed duplicate)
// Note: email index is already defined with index: true in schema

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
adminSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);