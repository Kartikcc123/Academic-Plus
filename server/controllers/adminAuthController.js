const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id, accountType: 'admin' }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Authenticate an Admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email }).select('+password');

    // Debug: Log admin existence
    console.log('Admin found:', admin ? 'yes' : 'no');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid Admin credentials' });
    }

    // Check if matchPassword method exists
    if (typeof admin.matchPassword !== 'function') {
      console.error('matchPassword method missing on admin object');
      return res.status(500).json({ message: 'Admin model error' });
    }

    const isMatch = await admin.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Admin credentials' });
    }

    res.json({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Admin Profile
// @route   PUT /api/admin/profile
// @access  Private (Admin Only)
const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('+password');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if matchPassword method exists
    if (typeof admin.matchPassword !== 'function') {
      console.error('matchPassword method missing on admin object');
      return res.status(500).json({ message: 'Admin model error' });
    }

    if (admin) {
      admin.name = req.body.name || admin.name;
      
      // Only update the password if a new one was actually typed in
      if (req.body.password) {
        admin.password = req.body.password;
      }

      const updatedAdmin = await admin.save();

      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        token: generateToken(updatedAdmin._id),
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change Admin Password
// @route   PUT /api/admin/change-password
// @access  Private (Admin Only)
const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    // Get admin with password
    const admin = await Admin.findById(req.admin._id).select('+password');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if matchPassword method exists
    if (typeof admin.matchPassword !== 'function') {
      console.error('matchPassword method missing on admin object');
      return res.status(500).json({ message: 'Admin model error' });
    }

    // Verify current password
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get All Admins
// @route   GET /api/admin/admins
// @access  Private (Admin Only)
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search Users
// @route   GET /api/admin/search-users
// @access  Private (Admin Only)
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    // Search by email or name (case insensitive)
    const users = await User.find({
      $or: [
        { email: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } }
      ],
      role: 'student' // Only search students, not other admins
    })
    .select('-password')
    .limit(20)
    .lean();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Grant Admin Access to User
// @route   PUT /api/admin/grant-admin
// @access  Private (Admin Only)
const grantAdminAccess = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already an admin
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'User is already an admin' });
    }

    // Check if there's already an admin with this email
    const adminExists = await Admin.findOne({ email: user.email });
    if (adminExists) {
      return res.status(400).json({ message: 'An admin with this email already exists' });
    }

    // Create admin account with same email
    const newAdmin = await Admin.create({
      name: user.name,
      email: user.email,
      password: user.password // Use the same hashed password
    });

    // Delete the user from User collection
    await User.findByIdAndDelete(userId);

    res.json({ message: `Admin access granted to ${newAdmin.email}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Revoke Admin Access
// @route   PUT /api/admin/revoke-admin
// @access  Private (Admin Only)
const revokeAdminAccess = async (req, res) => {
  try {
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    // Don't allow revoking your own admin access
    if (adminId === req.admin._id.toString()) {
      return res.status(400).json({ message: 'You cannot revoke your own admin access' });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Create a student user with same details
    const user = await User.create({
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: 'student',
      portalAccess: true
    });

    // Delete admin
    await Admin.findByIdAndDelete(adminId);

    res.json({ message: `Admin access revoked for ${user.email}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a New Secondary Admin
// @route   POST /api/admin/create-admin
// @access  Private (Admin Only)
const createNewAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Use lean() for faster query
    const adminExists = await Admin.findOne({ email }).lean();
    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const newAdmin = await Admin.create({ name, email, password });

    res.status(201).json({ message: `Successfully granted admin access to ${newAdmin.email}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  loginAdmin, 
  updateAdminProfile, 
  changeAdminPassword,
  getAllAdmins,
  searchUsers,
  grantAdminAccess,
  revokeAdminAccess,
  createNewAdmin 
};
