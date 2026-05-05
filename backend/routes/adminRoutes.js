const express = require('express');
const {
  getDashboardStats,
  getAnalytics,
  getAllUsers
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/analytics', getAnalytics);
router.get('/users', getAllUsers);

module.exports = router;
