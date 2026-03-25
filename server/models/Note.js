const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true, index: true },
  description: { type: String },
  fileUrl: { type: String, required: true }, // This stores either the Drive link OR the /uploads/ path
}, { timestamps: true });

// Index for faster queries on subject and creation date
noteSchema.index({ subject: 1, createdAt: -1 });

module.exports = mongoose.model('Note', noteSchema);