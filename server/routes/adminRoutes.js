const express = require('express');
const router = express.Router();

// Import Auth Controllers
const { 
  loginAdmin, 
  updateAdminProfile, 
  changeAdminPassword,
  getAllAdmins,
  searchUsers,
  grantAdminAccess,
  revokeAdminAccess,
  createNewAdmin 
} = require('../controllers/adminAuthController');

// Import Middleware
const { protectAdmin } = require('../middleware/adminMiddleware'); 

// Import User model
const User = require('../models/User'); 

// ==========================================
// ADMIN AUTHENTICATION ROUTES
// ==========================================
router.post('/login', loginAdmin);

// These routes require you to ALREADY be logged in as an admin to use them
router.put('/profile', protectAdmin, updateAdminProfile);
router.put('/change-password', protectAdmin, changeAdminPassword);
router.post('/create-admin', protectAdmin, createNewAdmin);

// ==========================================
// ADMIN ACCESS MANAGEMENT ROUTES
// ==========================================

// @route   GET /api/admin/admins
// @desc    Get all admins
// @access  Private/Admin
router.get('/admins', protectAdmin, getAllAdmins);

// @route   GET /api/admin/search-users
// @desc    Search users by email or name
// @access  Private/Admin
router.get('/search-users', protectAdmin, searchUsers);

// @route   PUT /api/admin/grant-admin
// @desc    Grant admin access to a user
// @access  Private/Admin
router.put('/grant-admin', protectAdmin, grantAdminAccess);

// @route   PUT /api/admin/revoke-admin
// @desc    Revoke admin access from an admin
// @access  Private/Admin
router.put('/revoke-admin', protectAdmin, revokeAdminAccess);

// ==========================================
// STUDENT MANAGEMENT ROUTES
// ==========================================

// @route   GET /api/admin/students
// @desc    Get all registered active students
// @access  Private/Admin
router.get('/students', protectAdmin, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
                               .select('-password')
                               .sort({ createdAt: -1 })
                               .lean(); 
    
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error while fetching students' });
  }
});

// @route   PATCH /api/admin/students/:id/portal-access
// @desc    Grant or revoke student portal access
// @access  Private/Admin
router.patch('/students/:id/portal-access', protectAdmin, async (req, res) => {
  try {
    const { portalAccess } = req.body;
    console.log('Portal access request:', { studentId: req.params.id, portalAccess });
    
    const student = await User.findById(req.params.id).select('-password').lean();

    if (!student) {
      console.log('Student not found:', req.params.id);
      return res.status(404).json({ message: 'Student not found' });
    }

    // Use findByIdAndUpdate for more reliable update
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      { portalAccess: Boolean(portalAccess) },
      { new: true }
    ).select('-password');

    console.log('Student updated:', updatedStudent);
    
    res.status(200).json({
      message: `Portal access ${updatedStudent.portalAccess ? 'granted' : 'revoked'} successfully`,
      student: updatedStudent,
    });
  } catch (error) {
    console.error('Portal access update error:', error);
    res.status(500).json({ message: 'Server error while updating portal access: ' + error.message });
  }
});

// @route   DELETE /api/admin/students/:id
// @desc    Permanently delete a student from the database
// @access  Private/Admin
router.delete('/students/:id', protectAdmin, async (req, res) => {
  try {
    const studentId = req.params.id;
    
    const deletedStudent = await User.findByIdAndDelete(studentId);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student successfully removed' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error while deleting student' });
  }
});

module.exports = router;
