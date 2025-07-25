const express = require('express');
const {
  getDashboardStats,
  getUserAnalytics,
  getRecentActivities,
  moderateProfile,
  getSystemLogs,
  generateReport
} = require('../controllers/adminController');
const auth = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(auth);
router.use(authorize('admin'));

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/dashboard', getDashboardStats);

// @route   GET /api/admin/analytics/users
// @desc    Get user analytics
// @access  Private/Admin
router.get('/analytics/users', getUserAnalytics);

// @route   GET /api/admin/activities
// @desc    Get recent activities
// @access  Private/Admin
router.get('/activities', getRecentActivities);

// @route   PUT /api/admin/profiles/:profileId/moderate
// @desc    Moderate profile
// @access  Private/Admin
router.put('/profiles/:profileId/moderate', moderateProfile);

// @route   GET /api/admin/logs
// @desc    Get system logs
// @access  Private/Admin
router.get('/logs', getSystemLogs);

// @route   GET /api/admin/reports
// @desc    Generate reports
// @access  Private/Admin
router.get('/reports', generateReport);

module.exports = router;
