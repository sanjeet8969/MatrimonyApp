const User = require('../models/User');
const Profile = require('../models/Profile');
const Match = require('../models/Match');
const Message = require('../models/Message');
const InterestRequest = require('../models/InterestRequest');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProfiles,
      totalMatches,
      totalMessages,
      newUsersThisMonth,
      activeUsersToday
    ] = await Promise.all([
      User.countDocuments(),
      Profile.countDocuments(),
      Match.countDocuments({ status: 'accepted' }),
      Message.countDocuments(),
      User.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }),
      User.countDocuments({
        lastLogin: {
          $gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      })
    ]);

    // User growth over last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Success rate (accepted matches / total interest requests)
    const [totalInterests, acceptedInterests] = await Promise.all([
      InterestRequest.countDocuments(),
      InterestRequest.countDocuments({ status: 'accepted' })
    ]);

    const successRate = totalInterests > 0 ? (acceptedInterests / totalInterests * 100).toFixed(2) : 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProfiles,
        totalMatches,
        totalMessages,
        newUsersThisMonth,
        activeUsersToday,
        successRate,
        userGrowth
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

// Get user analytics
exports.getUserAnalytics = async (req, res) => {
  try {
    // Users by status
    const usersByStatus = await User.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Users by registration month
    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $limit: 12
      }
    ]);

    // Profile completion distribution
    const profileCompletionStats = await Profile.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lt: ['$profileCompletion', 25] }, then: '0-25%' },
                { case: { $lt: ['$profileCompletion', 50] }, then: '25-50%' },
                { case: { $lt: ['$profileCompletion', 75] }, then: '50-75%' },
                { case: { $lt: ['$profileCompletion', 100] }, then: '75-99%' }
              ],
              default: '100%'
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      analytics: {
        usersByStatus,
        usersByMonth,
        profileCompletionStats
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

// Get recent activities
exports.getRecentActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    // Get recent registrations
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('email createdAt status');

    // Get recent matches
    const recentMatches = await Match.find({ status: 'accepted' })
      .sort({ acceptedAt: -1 })
      .limit(limit)
      .populate('user1 user2', 'email');

    // Get recent messages
    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('sender receiver', 'email');

    res.json({
      success: true,
      activities: {
        recentUsers,
        recentMatches,
        recentMessages
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

// Moderate profile
exports.moderateProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { action, reason } = req.body; // action: 'approve', 'reject', 'flag'

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    switch (action) {
      case 'approve':
        profile.isProfileVisible = true;
        break;
      case 'reject':
        profile.isProfileVisible = false;
        break;
      case 'flag':
        // Add to flagged profiles for review
        break;
    }

    await profile.save();

    res.json({
      success: true,
      message: `Profile ${action}ed successfully`,
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

// Get system logs
exports.getSystemLogs = async (req, res) => {
  try {
    // This would typically come from a logging system
    // For now, return mock data
    const logs = [
      {
        id: 1,
        type: 'info',
        message: 'User registered successfully',
        timestamp: new Date(),
        userId: 'user123'
      },
      {
        id: 2,
        type: 'error',
        message: 'Failed to upload image',
        timestamp: new Date(),
        userId: 'user456'
      }
    ];

    res.json({
      success: true,
      logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Generate reports
exports.generateReport = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    let reportData = {};

    switch (type) {
      case 'users':
        reportData = await User.find(dateFilter).select('email createdAt status');
        break;
      case 'matches':
        reportData = await Match.find({ ...dateFilter, status: 'accepted' })
          .populate('user1 user2', 'email');
        break;
      case 'revenue':
        // Implement revenue reporting when premium features are added
        reportData = { message: 'Revenue reporting not implemented yet' };
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    res.json({
      success: true,
      reportData,
      type,
      dateRange: { startDate, endDate }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
