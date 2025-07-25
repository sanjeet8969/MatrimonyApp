const Profile = require('../models/Profile');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

// Create or update profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { ...req.body },
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      profile = await Profile.create({
        user: req.user.id,
        ...req.body
      });
    }

    // Calculate and update profile completion
    profile.calculateCompletion();
    await profile.save();

    res.json({
      success: true,
      message: profile.isNew ? 'Profile created successfully' : 'Profile updated successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get profile by user ID
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ 
      user: req.params.userId 
    }).populate('user', 'email status createdAt');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Check if user can view this profile
    if (req.user.id !== req.params.userId && !profile.isProfileVisible) {
      return res.status(403).json({
        success: false,
        message: 'Profile is not visible'
      });
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Search profiles
exports.searchProfiles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      minAge,
      maxAge,
      religion,
      caste,
      city,
      state,
      education,
      occupation,
      minIncome,
      maxIncome
    } = req.query;

    const skip = (page - 1) * limit;
    let query = { 
      isProfileVisible: true,
      user: { $ne: req.user.id } // Exclude own profile
    };

    // Age filter
    if (minAge || maxAge) {
      const today = new Date();
      if (maxAge) {
        const minBirthDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
        query['personalDetails.dateOfBirth'] = { $gte: minBirthDate };
      }
      if (minAge) {
        const maxBirthDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
        query['personalDetails.dateOfBirth'] = { 
          ...query['personalDetails.dateOfBirth'],
          $lte: maxBirthDate 
        };
      }
    }

    // Religion filter
    if (religion) {
      query['religiousDetails.religion'] = new RegExp(religion, 'i');
    }

    // Caste filter
    if (caste) {
      query['religiousDetails.caste'] = new RegExp(caste, 'i');
    }

    // Location filters
    if (city) {
      query['contactDetails.address.city'] = new RegExp(city, 'i');
    }
    if (state) {
      query['contactDetails.address.state'] = new RegExp(state, 'i');
    }

    // Education filter
    if (education) {
      query['educationDetails.highestQualification'] = new RegExp(education, 'i');
    }

    // Occupation filter
    if (occupation) {
      query['educationDetails.workAs'] = new RegExp(occupation, 'i');
    }

    const profiles = await Profile.find(query)
      .populate('user', 'email status lastLogin')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Profile.countDocuments(query);

    res.json({
      success: true,
      profiles,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Upload profile photo
exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'matrimony/profiles',
      transformation: [
        { width: 400, height: 600, crop: 'fill' },
        { quality: 'auto' }
      ]
    });

    // Update profile with new photo
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.photos.push({
      url: result.secure_url,
      public_id: result.public_id,
      isPrimary: profile.photos.length === 0
    });

    await profile.save();

    res.json({
      success: true,
      message: 'Photo uploaded successfully',
      photo: {
        url: result.secure_url,
        public_id: result.public_id
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete profile photo
exports.deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;

    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const photoIndex = profile.photos.findIndex(photo => photo._id.toString() === photoId);
    if (photoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    const photo = profile.photos[photoIndex];

    // Delete from Cloudinary
    if (photo.public_id) {
      await cloudinary.uploader.destroy(photo.public_id);
    }

    // Remove from profile
    profile.photos.splice(photoIndex, 1);

    // If deleted photo was primary and there are other photos, make first one primary
    if (photo.isPrimary && profile.photos.length > 0) {
      profile.photos[0].isPrimary = true;
    }

    await profile.save();

    res.json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
