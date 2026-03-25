const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true, index: true },
  description: { type: String },
  youtubeLink: { type: String, required: true },
}, { timestamps: true });

// Index for faster queries on subject and creation date
videoSchema.index({ subject: 1, createdAt: -1 });

module.exports = mongoose.model('Video', videoSchema);