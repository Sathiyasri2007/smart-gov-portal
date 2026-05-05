const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'pending'
  },
  documents: [{
    filename: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  income: {
    type: Number,
    required: true
  },
  familyMembers: {
    type: Number,
    required: true
  },
  remarks: String,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'under_review']
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    remarks: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

applicationSchema.index({ user: 1, scheme: 1 });

module.exports = mongoose.model('Application', applicationSchema);
