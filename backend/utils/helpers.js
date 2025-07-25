const crypto = require('crypto');
const { promisify } = require('util');

// Generate random string
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate OTP
const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

// Slugify string
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Format phone number
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +91 XXXXX XXXXX for Indian numbers
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone;
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Deep clone object
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Remove sensitive fields from user object
const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  const sanitized = { ...userObj };
  
  delete sanitized.password;
  delete sanitized.refreshToken;
  delete sanitized.resetPasswordToken;
  delete sanitized.emailVerificationToken;
  
  return sanitized;
};

// Generate pagination metadata
const getPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null
  };
};

// Format error response
const formatErrorResponse = (message, statusCode = 400, errors = null) => {
  return {
    success: false,
    message,
    statusCode,
    errors,
    timestamp: new Date().toISOString()
  };
};

// Format success response
const formatSuccessResponse = (data, message = 'Success', meta = null) => {
  const response = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
  
  if (meta) {
    response.meta = meta;
  }
  
  return response;
};

// Delay function for rate limiting
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Check if email domain is valid
const isValidEmailDomain = (email) => {
  const blockedDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com'
  ];
  
  const domain = email.split('@')[1];
  return !blockedDomains.includes(domain);
};

// Generate file name
const generateFileName = (originalName, userId) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const extension = originalName.split('.').pop();
  
  return `${userId}_${timestamp}_${random}.${extension}`;
};

// Convert string to boolean
const stringToBoolean = (str) => {
  if (typeof str === 'boolean') return str;
  if (typeof str === 'string') {
    return str.toLowerCase() === 'true';
  }
  return Boolean(str);
};

// Mask sensitive data
const maskEmail = (email) => {
  if (!email) return '';
  
  const [username, domain] = email.split('@');
  const maskedUsername = username.length > 2 
    ? username.slice(0, 2) + '*'.repeat(username.length - 2)
    : username;
  
  return `${maskedUsername}@${domain}`;
};

const maskPhone = (phone) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 2)}****${cleaned.slice(-2)}`;
  }
  
  return phone;
};

// Capitalize first letter
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Generate referral code
const generateReferralCode = (userId) => {
  const timestamp = Date.now().toString().slice(-6);
  const userIdSuffix = userId.toString().slice(-4);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `${random}${timestamp}${userIdSuffix}`;
};

// Validate Indian Pincode
const validatePincode = (pincode) => {
  return /^[1-9][0-9]{5}$/.test(pincode);
};

// Get file size in human readable format
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

module.exports = {
  generateRandomString,
  generateOTP,
  slugify,
  calculateAge,
  formatPhoneNumber,
  sanitizeInput,
  deepClone,
  sanitizeUser,
  getPaginationMeta,
  formatErrorResponse,
  formatSuccessResponse,
  delay,
  isValidEmailDomain,
  generateFileName,
  stringToBoolean,
  maskEmail,
  maskPhone,
  capitalize,
  generateReferralCode,
  validatePincode,
  formatFileSize
};
