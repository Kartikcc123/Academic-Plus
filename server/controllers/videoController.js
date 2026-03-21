const Video = require('../models/Video');

const createVideo = async (req, res) => {
  try {
    const { title, subject, description, youtubeLink } = req.body;
    if (!youtubeLink) {
      return res.status(400).json({ message: 'YouTube link is required' });
    }

    const video = await Video.create({
      title: title || 'Video Lecture',
      subject: subject || 'General',
      description,
      youtubeLink
    });
    res.status(201).json({ message: 'Video published!', video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createVideo, getVideos };
