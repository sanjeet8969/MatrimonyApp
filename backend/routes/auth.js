const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  getMe,
  logout
} = require('../controllers/authController');
const auth = require('../middleware/authentication');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists().withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', auth, getMe);
router.post('/logout', logout);

module.exports = router;
