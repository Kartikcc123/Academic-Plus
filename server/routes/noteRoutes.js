const express = require('express');
const router = express.Router();
const { createNote, uploadLocalNote, getNotes, deleteNote } = require('../controllers/noteController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const { protectAny } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Admin Upload Routes
router.post('/', protectAdmin, createNote); 
router.post('/upload', protectAdmin, upload.single('pdfFile'), uploadLocalNote);

// Students and admins can fetch notes
router.get('/', protectAny, getNotes);

// Admin delete route
router.delete('/:id', protectAdmin, deleteNote);

module.exports = router;
