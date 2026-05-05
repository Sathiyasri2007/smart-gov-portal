const express = require('express');
const { body } = require('express-validator');
const {
  getAllSchemes,
  getScheme,
  createScheme,
  updateScheme,
  deleteScheme,
  getRecommendedSchemes
} = require('../controllers/schemeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllSchemes);
router.get('/recommended', protect, getRecommendedSchemes);
router.get('/:id', getScheme);

router.post('/', protect, authorize('admin'), [
  body('name').notEmpty().withMessage('Scheme name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('benefits').notEmpty().withMessage('Benefits are required'),
  body('deadline').isISO8601().withMessage('Valid deadline is required')
], createScheme);

router.put('/:id', protect, authorize('admin'), updateScheme);
router.delete('/:id', protect, authorize('admin'), deleteScheme);

module.exports = router;
