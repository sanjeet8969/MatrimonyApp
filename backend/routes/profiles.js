const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const {
  createOrUpdateProfile,
  getProfile,
  searchProfiles,
  uploadPhoto,
  deletePhoto
} = require('../controllers/profileController');
const auth = require('../middleware/authentication');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Profile validation rules
const profileValidation = [
  body('personalDetails.firstName').notEmpty().withMessage('First name is required'),
  body('personalDetails.lastName').notEmpty().withMessage('Last name is required'),
  body('personalDetails.dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('personalDetails.gender').isIn(['male', 'female']).withMessage('Valid gender is required'),
  body('contactDetails.address.city').notEmpty().withMessage('City is required'),
  body('contactDetails.address.state').notEmpty().withMessage('State is required'),
  body('contactDetails.address.country').notEmpty().withMessage('Country is required'),
  body('religiousDetails.religion').notEmpty().withMessage('Religion is required')
];

// @route   POST /api/profiles
// @desc    Create or update profile
// @access  Private
router.post('/', auth, profileValidation, createOrUpdateProfile);

// @route   GET /api/profiles/search
// @desc    Search profiles
// @access  Private
router.get('/search', auth, searchProfiles);

// @route   GET /api/profiles/:userId
// @desc    Get profile by user ID
// @access  Private
router.get('/:userId', auth, getProfile);

// @route   POST /api/profiles/photos
// @desc    Upload profile photo
// @access  Private
router.post('/photos', auth, upload.single('photo'), uploadPhoto);

// @route   DELETE /api/profiles/photos/:photoId
// @desc    Delete profile photo
// @access  Private
router.delete('/photos/:photoId', auth, deletePhoto);

module.exports = router;
