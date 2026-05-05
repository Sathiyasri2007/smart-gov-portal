const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide scheme name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['Education', 'Healthcare', 'Agriculture', 'Employment', 'Housing', 'Social Welfare', 'Infrastructure', 'Other']
  },
  eligibility: [{
    type: String
  }],
  benefits: {
    type: String,
    required: true
  },
  requiredDocuments: [{
    type: String
  }],
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired'],
    default: 'active'
  },
  minIncome: Number,
  maxIncome: Number,
  ageLimit: {
    min: Number,
    max: Number
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

schemeSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Scheme', schemeSchema);
