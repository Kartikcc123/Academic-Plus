const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Helper Function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
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
        token: generateToken(user._id),
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

    // Find user by email and explicitly select the password field (since we hid it in the model)
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      if (!user.portalAccess) {
        return res.status(403).json({ message: 'Portal access is pending admin approval' });
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        portalAccess: user.portalAccess,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
