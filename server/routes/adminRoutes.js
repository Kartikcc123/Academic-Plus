const express = require('express');
const router = express.Router();

// 1. Your Auth Controllers
const { loginAdmin, updateAdminProfile, createNewAdmin } = require('../controllers/adminAuthController');

// 2. Your Middleware (The Bouncer)
const { protectAdmin } = require('../middleware/adminMiddleware'); 

// 3. Import the User model so we can fetch and delete students!
const User = require('../models/User'); 

// ==========================================
// ADMIN AUTHENTICATION ROUTES
// ==========================================
router.post('/login', loginAdmin);

// These routes require you to ALREADY be logged in as an admin to use them
router.put('/profile', protectAdmin, updateAdminProfile);
router.post('/create-admin', protectAdmin, createNewAdmin);


// ==========================================
// ADMIN DATA ROUTES (The VIP Bridge)
// ==========================================

// @route   GET /api/admin/students
// @desc    Get all registered active students
// @access  Private/Admin
router.get('/students', protectAdmin, async (req, res) => {
  try {
    // Find student users, hide passwords, and sort newest first
    const students = await User.find({ role: 'student' })
                               .select('-password')
                               .sort({ createdAt: -1 }); 
    
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error while fetching students' });
  }
});

// @route   DELETE /api/admin/students/:id
// @desc    Permanently delete a student from the database
// @access  Private/Admin
router.delete('/students/:id', protectAdmin, async (req, res) => {
  try {
    const studentId = req.params.id;
    
    // Find the student by ID and remove them from the database
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
