const Inquiry = require('../models/Inquiry');

// @desc    Submit a new admission inquiry
// @route   POST /api/inquiries
// @access  Public (Anyone can submit)
const createInquiry = async (req, res) => {
  try {
    const { name, phone, course } = req.body;

    if (!name || !phone || !course) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const inquiry = await Inquiry.create({ name, phone, course });
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not submit inquiry' });
  }
};

// @desc    Get all inquiries for Director Panel
// @route   GET /api/inquiries
// @access  Private (Admin Only)
const getInquiries = async (req, res) => {
  try {
    // Fetch all inquiries, sorted by newest first
    // Use lean() for faster query - returns plain JS objects instead of Mongoose documents
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not fetch inquiries' });
  }
};

module.exports = { createInquiry, getInquiries };
