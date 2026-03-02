const Video = require('../models/Video');

// @desc    Get all videos for students
// @route   GET /api/videos
// @access  Private (Students)
const getVideos = async (req, res) => {
  try {
    // Fetches all videos, sorting by newest first
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload a new YouTube video link
// @route   POST /api/videos
// @access  Private (Admin Only)
const createVideo = async (req, res) => {
  try {
    const { title, description, youtubeLink, subject } = req.body;

    if (!title || !youtubeLink || !subject) {
      return res.status(400).json({ message: 'Please provide title, link, and subject' });
    }

    const video = await Video.create({
      title,
      description,
      youtubeLink,
      subject,
      uploadedBy: req.admin._id, // Attached by the adminMiddleware
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private (Admin Only)
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Ensure only an admin can delete
    if (!req.admin) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await video.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVideos, createVideo, deleteVideo };