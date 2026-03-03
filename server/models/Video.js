const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String },
  youtubeLink: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);