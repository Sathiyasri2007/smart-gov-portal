const express = require('express');
const { body } = require('express-validator');
const {
  createApplication,
  getUserApplications,
  getAllApplications,
  getApplication,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', protect, upload.array('documents', 5), [
  body('schemeId').notEmpty().withMessage('Scheme ID is required'),
  body('income').isNumeric().withMessage('Income must be a number'),
  body('familyMembers').isNumeric().withMessage('Family members must be a number')
], createApplication);

router.get('/user', protect, getUserApplications);
router.get('/', protect, authorize('admin'), getAllApplications);
router.get('/:id', protect, getApplication);
router.patch('/:id', protect, authorize('admin'), updateApplicationStatus);

module.exports = router;
