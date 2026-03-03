const multer = require('multer');
const path = require('path');

// 1. Configure where and how the file is saved
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // Always save to server/uploads
  },
  filename(req, file, cb) {
    // Renames the file to have a timestamp so names are always unique
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

// 2. Create a filter to only allow documents (PDFs, Word docs)
const checkFileType = (file, cb) => {
  const filetypes = /pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images and Videos are not allowed. Please upload PDFs or Word Documents only.'));
  }
};

// 3. Initialize Multer
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
