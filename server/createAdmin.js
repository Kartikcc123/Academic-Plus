const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin'); // Adjust this path if your Admin model is inside a different folder

// Load your environment variables so it can find your MONGO_URI
dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to your MongoDB database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database...');

    // The credentials for Dr. Ajay based on the poster
    const adminData = {
      name: 'Dr. Ajay Singh Amera',
      email: 'jay001amera@gmail.com',
      password: 'AdminPassword123!', // The pre-save hook in your Admin model will securely hash this!
    };

    // Check if the admin already exists so we don't cause an error
    const adminExists = await Admin.findOne({ email: adminData.email });
    
    if (adminExists) {
      console.log('⚠️ Admin account already exists in the database!');
      process.exit();
    }

    // Create the admin account
    const admin = await Admin.create(adminData);
    
    console.log('✅ Admin Account Created Successfully!');
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    process.exit();

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createSuperAdmin();