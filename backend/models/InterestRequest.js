const mongoose = require('mongoose');

const interestRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'expired'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 500
  },
  respondedAt: Date,
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
interestRequestSchema.index({ receiver: 1, status: 1, createdAt: -1 });
interestRequestSchema.index({ sender: 1, createdAt: -1 });
interestRequestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('InterestRequest', interestRequestSchema);
