const Application = require('../models/Application');
const Scheme = require('../models/Scheme');
const Notification = require('../models/Notification');
const { validationResult } = require('express-validator');

exports.createApplication = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { schemeId, income, familyMembers } = req.body;

    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    const existingApplication = await Application.findOne({
      user: req.user.id,
      scheme: schemeId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this scheme'
      });
    }

    const documents = req.files ? req.files.map(file => ({
      filename: file.filename,
      path: file.path
    })) : [];

    const application = await Application.create({
      user: req.user.id,
      scheme: schemeId,
      income,
      familyMembers,
      documents,
      statusHistory: [{
        status: 'pending',
        changedBy: req.user.id,
        remarks: 'Application submitted',
        timestamp: new Date()
      }]
    });

    await Notification.create({
      user: req.user.id,
      title: 'Application Submitted',
      message: `Your application for ${scheme.name} has been submitted successfully`,
      type: 'success',
      relatedApplication: application._id
    });

    res.status(201).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('scheme', 'name category deadline')
      .populate('statusHistory.changedBy', 'name email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllApplications = async (req, res, next) => {
  try {
    const { status, scheme } = req.query;
    let query = {};

    if (status) query.status = status;
    if (scheme) query.scheme = scheme;

    const applications = await Application.find(query)
      .populate('user', 'name email phone address state occupation dateOfBirth')
      .populate('scheme', 'name category')
      .sort('-createdAt');

    res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('user', 'name email phone address')
      .populate('scheme')
      .populate('reviewedBy', 'name email')
      .populate('statusHistory.changedBy', 'name email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (req.user.role !== 'admin' && application.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this application'
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;
    application.remarks = remarks;
    application.reviewedBy = req.user.id;
    application.reviewedAt = Date.now();
    
    // Add to status history
    application.statusHistory.push({
      status: status,
      changedBy: req.user.id,
      remarks: remarks || `Application ${status}`,
      timestamp: new Date()
    });

    await application.save();

    await Notification.create({
      user: application.user,
      title: 'Application Status Updated',
      message: `Your application status has been updated to ${status}`,
      type: status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'info',
      relatedApplication: application._id
    });

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};
