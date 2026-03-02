const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a note title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  fileUrl: {
    type: String,
    required: [true, 'Please provide the file URL']
  },
  subject: {
    type: String,
    required: [true, 'Please specify the subject']
  },
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);