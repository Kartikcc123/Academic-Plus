const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a video title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  youtubeLink: {
    type: String,
    required: [true, 'Please add the YouTube embed link']
  },
  subject: {
    type: String,
    required: [true, 'Please specify the subject (e.g., Math, Physics)']
  },
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Links this video to the admin who uploaded it
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);