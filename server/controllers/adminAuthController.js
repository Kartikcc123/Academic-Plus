const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Authenticate an Admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin.id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid Admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @access  Private (Admin Only)
const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('+password');

    if (admin) {
      admin.name = req.body.name || admin.name;
      
      // Only update the password if a new one was actually typed in
      if (req.body.password) {
        admin.password = req.body.password;
      }

      const updatedAdmin = await admin.save();

      res.json({
        _id: updatedAdmin.id,
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

// @desc    Add a New Secondary Admin (WhatsApp style group-admin feature)
// @route   POST /api/admin/create-admin
// @access  Private (Admin Only)
const createNewAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const newAdmin = await Admin.create({ name, email, password });

    res.status(201).json({ message: `Successfully granted admin access to ${newAdmin.email}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Don't forget to export them at the bottom!
module.exports = { loginAdmin, updateAdminProfile, createNewAdmin };
