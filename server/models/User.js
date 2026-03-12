const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false // When we fetch users, don't return the password by default!
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  portalAccess: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function() {
  // If the password isn't modified, move on (useful for profile updates)
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// A custom method to check passwords during login
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
