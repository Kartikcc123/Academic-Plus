const Note = require('../models/Note'); // Ensure you have this model created!

// @desc    Create a new Note (Using a Google Drive / External Link)
// @route   POST /api/notes
// @access  Private (Admin Only)
const createNote = async (req, res) => {
  try {
    const { title, subject, description, fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ message: 'Please provide a file URL.' });
    }

    const safeTitle = title || 'Study Material';
    const safeSubject = subject || 'General';

    const note = await Note.create({
      title: safeTitle,
      subject: safeSubject,
      description,
      fileUrl,
    });

    res.status(201).json({ message: 'Note linked successfully!', note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload a Local File and create a Note document
// @route   POST /api/notes/upload
// @access  Private (Admin Only)
const uploadLocalNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was detected in the upload.' });
    }

    const { title, subject, description } = req.body;
    const baseName = req.file.originalname.replace(/\.[^/.]+$/, '');
    const safeTitle = title || baseName || 'Study Material';
    const safeSubject = subject || 'General';

    const note = await Note.create({
      title: safeTitle,
      subject: safeSubject,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: 'File uploaded and note published successfully!',
      note
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all Notes (for the Student Dashboard)
// @route   GET /api/notes
// @access  Private (Logged in Students & Admins)
const getNotes = async (req, res) => {
  try {
    // Fetch all notes, sorting by the newest ones first
    // Use lean() for faster query - returns plain JS objects instead of Mongoose documents
    const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes.' });
  }
};

// @desc    Delete a Note
// @route   DELETE /api/notes/:id
// @access  Private (Admin Only)
const deleteNote = async (req, res) => {
  try {
    // Use findByIdAndDelete for better performance
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EXPORT ALL FUNCTIONS (This is what caused your error earlier!)
module.exports = {
  createNote,
  uploadLocalNote,
  getNotes,
  deleteNote
};
