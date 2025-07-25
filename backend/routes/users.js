const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const auth = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', auth, authorize('admin'), getAllUsers);

// @route   GET /api/users/stats
// @desc    Get user statistics (Admin only)
// @access  Private/Admin
router.get('/stats', auth, authorize('admin'), getUserStats);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, getUserById);

// @route   PUT /api/users/:id/status
// @desc    Update user status (Admin only)
// @access  Private/Admin
router.put('/:id/status', auth, authorize('admin'), updateUserStatus);

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin only)
// @access  Private/Admin
router.delete('/:id', auth, authorize('admin'), deleteUser);

module.exports = router;
