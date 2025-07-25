const Message = require('../models/Message');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { receiverId, content, messageType = 'text' } = req.body;

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: 'Receiver not found'
      });
    }

    // Create message
    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      content,
      messageType
    });

    await message.populate('sender receiver', 'email');

    // Emit socket event for real-time messaging
    req.io.to(`user_${receiverId}`).emit('new_message', {
      message,
      sender: {
        id: req.user.id,
        email: req.user.email
      }
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get conversation between two users
exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ],
      isDeleted: false
    })
    .populate('sender receiver', 'email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    // Mark messages as read
    await Message.updateMany(
      {
        sender: userId,
        receiver: req.user.id,
        'readStatus.isRead': false
      },
      {
        'readStatus.isRead': true,
        'readStatus.readAt': new Date()
      }
    );

    const total = await Message.countDocuments({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ],
      isDeleted: false
    });

    res.json({
      success: true,
      messages: messages.reverse(), // Reverse to show oldest first
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

// Get all conversations for a user
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
          ],
          isDeleted: false
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user._id] },
              '$receiver',
              '$sender'
            ]
          },
          lastMessage: { $first: '$content' },
          lastMessageAt: { $first: '$createdAt' },
          messageType: { $first: '$messageType' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiver', req.user._id] },
                    { $eq: ['$readStatus.isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $lookup: {
          from: 'profiles',
          localField: '_id',
          foreignField: 'user',
          as: 'profile'
        }
      },
      {
        $sort: { lastMessageAt: -1 }
      }
    ]);

    res.json({
      success: true,
      conversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user is sender or receiver
    if (message.sender.toString() !== req.user.id && message.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this message'
      });
    }

    // Add user to deletedBy array
    message.deletedBy.push({
      user: req.user.id,
      deletedAt: new Date()
    });

    // If both users have deleted, mark as deleted
    if (message.deletedBy.length === 2) {
      message.isDeleted = true;
    }

    await message.save();

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { senderId } = req.params;

    await Message.updateMany(
      {
        sender: senderId,
        receiver: req.user.id,
        'readStatus.isRead': false
      },
      {
        'readStatus.isRead': true,
        'readStatus.readAt': new Date()
      }
    );

    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get unread message count
exports.getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Message.countDocuments({
      receiver: req.user.id,
      'readStatus.isRead': false,
      isDeleted: false
    });

    res.json({
      success: true,
      unreadCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
