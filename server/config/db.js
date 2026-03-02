const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We use the URI from our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1); // Exit the process with failure if the DB doesn't connect
  }
};

module.exports = connectDB;