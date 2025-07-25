const express = require('express');
const { body } = require('express-validator');
const {
  sendMessage,
  getConversation,
  getConversations,
  deleteMessage,
  markAsRead,
  getUnreadCount
} = require('../controllers/messageController');
const auth = require('../middleware/authentication');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// Message validation
const messageValidation = [
  body('receiverId').isMongoId().withMessage('Valid receiver ID is required'),
  body('content').notEmpty().isLength({ min: 1, max: 1000 }).withMessage('Message content is required and cannot exceed 1000 characters'),
  body('messageType').optional().isIn(['text', 'image', 'file']).withMessage('Invalid message type')
];

// @route   POST /api/messages
// @desc    Send message
// @access  Private
router.post('/', auth, rateLimiter.messageLimit, messageValidation, sendMessage);

// @route   GET /api/messages/conversations
// @desc    Get all conversations
// @access  Private
router.get('/conversations', auth, getConversations);

// @route   GET /api/messages/unread-count
// @desc    Get unread message count
// @access  Private
router.get('/unread-count', auth, getUnreadCount);

// @route   GET /api/messages/:userId
// @desc    Get conversation with specific user
// @access  Private
router.get('/:userId', auth, getConversation);

// @route   DELETE /api/messages/:messageId
// @desc    Delete message
// @access  Private
router.delete('/:messageId', auth, deleteMessage);

// @route   PUT /api/messages/read/:senderId
// @desc    Mark messages as read
// @access  Private
router.put('/read/:senderId', auth, markAsRead);

module.exports = router;
