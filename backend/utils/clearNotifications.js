const mongoose = require('mongoose');
const Notification = require('../models/Notification');
require('dotenv').config();

const clearNotifications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-government-portal');
    console.log('MongoDB Connected...');

    // Delete all notifications
    const result = await Notification.deleteMany({});
    
    console.log(`✓ Cleared ${result.deletedCount} notifications`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

clearNotifications();
