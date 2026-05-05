const mongoose = require('mongoose');
const Application = require('../models/Application');
require('dotenv').config();

const clearApprovedApplications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-government-portal');
    console.log('MongoDB Connected...');

    // Delete all approved applications
    const result = await Application.deleteMany({ status: 'approved' });
    
    console.log(`✓ Cleared ${result.deletedCount} approved applications`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

clearApprovedApplications();
