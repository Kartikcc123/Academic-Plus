const express = require('express');
const router = express.Router();
const { getVideos, createVideo, deleteVideo } = require('../controllers/videoController');

// Import our completely separate middlewares
const { protect } = require('../middleware/authMiddleware'); // Student Auth
const { protectAdmin } = require('../middleware/adminMiddleware'); // Admin Auth

// Student Route: Only requires a valid Student JWT to view videos
router.get('/', protect, getVideos);

// Admin Routes: Strictly require a valid Admin JWT to upload or delete
router.post('/', protectAdmin, createVideo);
router.delete('/:id', protectAdmin, deleteVideo);

module.exports = router;