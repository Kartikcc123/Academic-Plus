const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connection pool settings for better performance
    const maxPoolSize = 10;
    const minPoolSize = 2;
    
    // We use the URI from our .env file with connection options
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize,
      minPoolSize,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1); // Exit the process with failure if the DB doesn't connect
  }
};

module.exports = connectDB;