const express = require('express');
const { body } = require('express-validator');
const {
  findMatches,
  sendInterest,
  respondToInterest,
  getMatches,
  getInterestRequests
} = require('../controllers/matchController');
const auth = require('../middleware/authentication');

const router = express.Router();

// Interest request validation
const interestValidation = [
  body('receiverId').isMongoId().withMessage('Valid receiver ID is required'),
  body('message').optional().isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters')
];

// Interest response validation
const responseValidation = [
  body('status').isIn(['accepted', 'declined']).withMessage('Status must be accepted or declined')
];

// @route   GET /api/matches/find
// @desc    Find potential matches
// @access  Private
router.get('/find', auth, findMatches);

// @route   GET /api/matches
// @desc    Get user's matches
// @access  Private
router.get('/', auth, getMatches);

// @route   POST /api/matches/interest
// @desc    Send interest request
// @access  Private
router.post('/interest', auth, interestValidation, sendInterest);

// @route   PUT /api/matches/interest/:requestId
// @desc    Respond to interest request
// @access  Private
router.put('/interest/:requestId', auth, responseValidation, respondToInterest);

// @route   GET /api/matches/interests
// @desc    Get interest requests (sent or received)
// @access  Private
router.get('/interests', auth, getInterestRequests);

module.exports = router;
