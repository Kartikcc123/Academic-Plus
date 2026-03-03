const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a student name'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a mobile number'],
  },
  course: {
    type: String,
    required: [true, 'Please select a course of interest'],
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Admitted'],
    default: 'New' // All new inquiries start as "New"
  }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);