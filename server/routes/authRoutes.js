const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   DELETE /api/auth/account
// @access  Private (Student)
router.delete('/account', protect, deleteAccount);

module.exports = router;
