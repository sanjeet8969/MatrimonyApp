const Match = require('../models/Match');
const Profile = require('../models/Profile');
const InterestRequest = require('../models/InterestRequest');
const { calculateCompatibility } = require('../utils/matchingAlgorithm');

// Find potential matches
exports.findMatches = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get user's profile
    const userProfile = await Profile.findOne({ user: req.user.id });
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Build match criteria based on preferences
    const matchCriteria = {
      user: { $ne: req.user.id },
      isProfileVisible: true
    };

    // Age preference
    if (userProfile.partnerPreferences.ageRange) {
      const { min, max } = userProfile.partnerPreferences.ageRange;
      const today = new Date();
      const maxBirthDate = new Date(today.getFullYear() - min, today.getMonth(), today.getDate());
      const minBirthDate = new Date(today.getFullYear() - max, today.getMonth(), today.getDate());
      
      matchCriteria['personalDetails.dateOfBirth'] = {
        $gte: minBirthDate,
        $lte: maxBirthDate
      };
    }

    // Religion preference
    if (userProfile.partnerPreferences.religion && userProfile.partnerPreferences.religion.length > 0) {
      matchCriteria['religiousDetails.religion'] = {
        $in: userProfile.partnerPreferences.religion
      };
    }

    // Location preference
    if (userProfile.partnerPreferences.preferredLocation && userProfile.partnerPreferences.preferredLocation.length > 0) {
      matchCriteria['contactDetails.address.city'] = {
        $in: userProfile.partnerPreferences.preferredLocation
      };
    }

    // Education preference
    if (userProfile.partnerPreferences.education && userProfile.partnerPreferences.education.length > 0) {
      matchCriteria['educationDetails.highestQualification'] = {
        $in: userProfile.partnerPreferences.education
      };
    }

    // Find potential matches
    const potentialMatches = await Profile.find(matchCriteria)
      .populate('user', 'email status lastLogin')
      .skip(skip)
      .limit(limit);

    // Calculate compatibility scores
    const matchesWithScores = potentialMatches.map(profile => ({
      profile,
      compatibilityScore: calculateCompatibility(userProfile, profile)
    }));

    // Sort by compatibility score
    matchesWithScores.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    const total = await Profile.countDocuments(matchCriteria);

    res.json({
      success: true,
      matches: matchesWithScores,
      pagination: {
        current: page,
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

// Send interest request
exports.sendInterest = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    // Check if receiver exists
    const receiverProfile = await Profile.findOne({ user: receiverId });
    if (!receiverProfile) {
      return res.status(404).json({
        success: false,
        message: 'Receiver profile not found'
      });
    }

    // Check if interest already sent
    const existingInterest = await InterestRequest.findOne({
      sender: req.user.id,
      receiver: receiverId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingInterest) {
      return res.status(400).json({
        success: false,
        message: 'Interest already sent to this user'
      });
    }

    // Create interest request
    const interestRequest = await InterestRequest.create({
      sender: req.user.id,
      receiver: receiverId,
      message: message || 'I am interested in your profile.'
    });

    await interestRequest.populate('sender', 'email');

    res.status(201).json({
      success: true,
      message: 'Interest sent successfully',
      interestRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Respond to interest request
exports.respondToInterest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // 'accepted' or 'declined'

    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const interestRequest = await InterestRequest.findById(requestId);
    if (!interestRequest) {
      return res.status(404).json({
        success: false,
        message: 'Interest request not found'
      });
    }

    // Check if user is the receiver
    if (interestRequest.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to respond to this request'
      });
    }

    // Update interest request
    interestRequest.status = status;
    interestRequest.respondedAt = new Date();
    await interestRequest.save();

    // If accepted, create a match
    if (status === 'accepted') {
      const match = await Match.create({
        user1: interestRequest.sender,
        user2: interestRequest.receiver,
        status: 'accepted',
        initiatedBy: interestRequest.sender,
        acceptedAt: new Date()
      });
    }

    res.json({
      success: true,
      message: `Interest ${status} successfully`,
      interestRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get user's matches
exports.getMatches = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const matches = await Match.find({
      $or: [
        { user1: req.user.id },
        { user2: req.user.id }
      ],
      status: 'accepted'
    })
    .populate('user1', 'email')
    .populate('user2', 'email')
    .sort({ acceptedAt: -1 })
    .skip(skip)
    .limit(limit);

    // Get profiles for matched users
    const matchesWithProfiles = await Promise.all(
      matches.map(async (match) => {
        const otherUserId = match.user1._id.toString() === req.user.id ? match.user2._id : match.user1._id;
        const profile = await Profile.findOne({ user: otherUserId });
        return {
          match,
          profile
        };
      })
    );

    const total = await Match.countDocuments({
      $or: [
        { user1: req.user.id },
        { user2: req.user.id }
      ],
      status: 'accepted'
    });

    res.json({
      success: true,
      matches: matchesWithProfiles,
      pagination: {
        current: page,
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

// Get interest requests
exports.getInterestRequests = async (req, res) => {
  try {
    const { type = 'received' } = req.query; // 'sent' or 'received'
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = type === 'sent' 
      ? { sender: req.user.id }
      : { receiver: req.user.id };

    const interests = await InterestRequest.find(query)
      .populate(type === 'sent' ? 'receiver' : 'sender', 'email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get profiles for interest users
    const interestsWithProfiles = await Promise.all(
      interests.map(async (interest) => {
        const userId = type === 'sent' ? interest.receiver._id : interest.sender._id;
        const profile = await Profile.findOne({ user: userId });
        return {
          interest,
          profile
        };
      })
    );

    const total = await InterestRequest.countDocuments(query);

    res.json({
      success: true,
      interests: interestsWithProfiles,
      pagination: {
        current: page,
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
