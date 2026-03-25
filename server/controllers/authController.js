const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Inquiry = require('../models/Inquiry');

// Generate JWT Helper Function
const generateToken = (id, accountType = 'student') => {
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
  return jwt.sign({ id, accountType }, jwtSecret, {
    expiresIn: '30d', // Token lasts for 30 days
  });
};

// @desc    Register a new student/user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (password hashing is handled in the User model pre-save hook!)
    const user = await User.create({
      name,
      email,
      password,
      // role defaults to 'student' automatically
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        portalAccess: user.portalAccess,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user by email and explicitly select the password field
    const user = await User.findOne({ email }).select('+password');

    // Debug: Log user existence (not the password)
    console.log('User found:', user ? 'yes' : 'no');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if matchPassword method exists
    if (typeof user.matchPassword !== 'function') {
      console.error('matchPassword method missing on user object');
      return res.status(500).json({ message: 'User model error' });
    }

    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.portalAccess) {
      return res.status(403).json({ message: 'Portal access is pending admin approval' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      portalAccess: user.portalAccess,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete student account
// @route   DELETE /api/auth/account
// @access  Private (Student)
const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required to delete account' });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if matchPassword method exists
    if (typeof user.matchPassword !== 'function') {
      console.error('matchPassword method missing on user object');
      return res.status(500).json({ message: 'User model error' });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }

    // Delete user's inquiries
    await Inquiry.deleteMany({ name: user.name, phone: { $exists: true } });

    // Delete the user
    await User.findByIdAndDelete(user._id);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, deleteAccount };
