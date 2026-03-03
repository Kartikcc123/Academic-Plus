const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const path = require('path');

// Global Middleware
app.use(cors()); // Essential: Allows your React PWA to make requests to this backend
app.use(express.json()); // Allows the server to accept JSON data in request bodies

// A simple test route to make sure it's working
app.get('/', (req, res) => {
  res.send('Coaching Center API is running...');
});

// We will mount your actual routes here in the next steps!
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});