const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'blocked'],
    default: 'pending'
  },
  initiatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  acceptedAt: Date,
  rejectedAt: Date,
  metadata: {
    commonInterests: [String],
    compatibilityFactors: {
      age: Number,
      location: Number,
      education: Number,
      profession: Number,
      lifestyle: Number
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
matchSchema.index({ user1: 1, user2: 1 }, { unique: true });
matchSchema.index({ status: 1, createdAt: -1 });

// Ensure user1 is always less than user2 to avoid duplicates
matchSchema.pre('save', function(next) {
  if (this.user1.toString() > this.user2.toString()) {
    [this.user1, this.user2] = [this.user2, this.user1];
  }
  next();
});

module.exports = mongoose.model('Match', matchSchema);
