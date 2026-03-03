const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { createInquiry, getInquiries } = require('../controllers/inquiryController');
const { protectAdmin } = require('../middleware/adminMiddleware');

// @route   POST /api/inquiries (Public: User submits form)
router.post('/', createInquiry);

// @route   GET /api/inquiries (Private: Admin views leads)
router.get('/', protectAdmin, getInquiries);

// @route   PUT /api/inquiries/:id (Private: Admin updates lead status)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find the lead and update its status
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Returns the updated document
    );
    
    if (!updatedInquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.status(200).json(updatedInquiry);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Error updating inquiry status' });
  }
});

module.exports = router;
