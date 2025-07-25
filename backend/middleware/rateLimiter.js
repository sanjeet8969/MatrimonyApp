const rateLimit = require('express-rate-limit');

// General API rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Authentication rate limiting (more strict for login/register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Message rate limiting
const messageLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 messages per minute
  message: {
    success: false,
    message: 'Too many messages sent, please slow down.'
  },
  keyGenerator: (req) => {
    // Use user ID instead of IP for authenticated requests
    return req.user ? req.user.id : req.ip;
  }
});

// Interest request rate limiting
const interestLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each user to 20 interest requests per hour
  message: {
    success: false,
    message: 'Too many interest requests sent, please try again later.'
  },
  keyGenerator: (req) => {
    return req.user ? req.user.id : req.ip;
  }
});

// Search rate limiting
const searchLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each user to 30 searches per minute
  message: {
    success: false,
    message: 'Too many search requests, please slow down.'
  },
  keyGenerator: (req) => {
    return req.user ? req.user.id : req.ip;
  }
});

// Upload rate limiting
const uploadLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // limit each user to 50 uploads per hour
  message: {
    success: false,
    message: 'Too many uploads, please try again later.'
  },
  keyGenerator: (req) => {
    return req.user ? req.user.id : req.ip;
  }
});

module.exports = {
  generalLimiter,
  authLimiter,
  messageLimit,
  interestLimit,
  searchLimit,
  uploadLimit
};
