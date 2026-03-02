const express = require('express');
const router = express.Router();
const { getNotes, createNote, deleteNote } = require('../controllers/noteController');

// Import our middlewares
const { protect } = require('../middleware/authMiddleware'); // For Students
const { protectAdmin } = require('../middleware/adminMiddleware'); // For You

// Student Route: Needs a valid student token to download/view notes
router.get('/', protect, getNotes);

// Admin Routes: Strictly needs your admin token to upload or remove materials
router.post('/', protectAdmin, createNote);
router.delete('/:id', protectAdmin, deleteNote);

module.exports = router;