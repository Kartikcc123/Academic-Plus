const express = require('express');
const router = express.Router();
const { createVideo, getVideos } = require('../controllers/videoController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const { protectAny } = require('../middleware/authMiddleware');

router.post('/', protectAdmin, createVideo); // Only Director can upload
router.get('/', protectAny, getVideos);      // Students and admins can view

module.exports = router;
