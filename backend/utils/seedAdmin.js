const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    const adminExists = await User.findOne({ email: 'admin@smartgov.in' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    await User.create({
      name: 'Admin',
      email: 'admin@smartgov.in',
      password: 'admin123',
      role: 'admin',
      phone: '1234567890'
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@smartgov.in');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedAdmin();
