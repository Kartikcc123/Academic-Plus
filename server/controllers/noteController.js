const Note = require('../models/Note');

// @desc    Get all notes for students
// @route   GET /api/notes
// @access  Private (Students)
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload a new note/PDF link
// @route   POST /api/notes
// @access  Private (Admin Only)
const createNote = async (req, res) => {
  try {
    const { title, description, fileUrl, subject } = req.body;

    if (!title || !fileUrl || !subject) {
      return res.status(400).json({ message: 'Please provide title, file URL, and subject' });
    }

    const note = await Note.create({
      title,
      description,
      fileUrl,
      subject,
      uploadedBy: req.admin._id, // Secured by protectAdmin middleware
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private (Admin Only)
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (!req.admin) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await note.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, createNote, deleteNote };