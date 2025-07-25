// Application Constants
const APP_CONSTANTS = {
  // Application Info
  APP_NAME: 'MatrimonyApp',
  APP_VERSION: '1.0.0',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Server Configuration
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || 'localhost',
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/matrimony',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword'],
  
  // Email
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@matrimonyapp.com',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
  
  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50
};

// User Roles
const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
};

// Profile Status
const PROFILE_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
  PENDING_APPROVAL: 'pending_approval'
};

// Match Status
const MATCH_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  BLOCKED: 'blocked',
  EXPIRED: 'expired'
};

// Message Types
const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  SYSTEM: 'system',
  AUDIO: 'audio',
  VIDEO: 'video'
};

// Message Status
const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed'
};

// Notification Types
const NOTIFICATION_TYPES = {
  INTEREST_RECEIVED: 'interest_received',
  INTEREST_ACCEPTED: 'interest_accepted',
  INTEREST_DECLINED: 'interest_declined',
  MESSAGE_RECEIVED: 'message_received',
  PROFILE_VIEWED: 'profile_viewed',
  NEW_MATCH: 'new_match',
  PROFILE_APPROVED: 'profile_approved',
  PROFILE_REJECTED: 'profile_rejected',
  PREMIUM_EXPIRED: 'premium_expired',
  SYSTEM: 'system'
};

// Religion Options
const RELIGIONS = {
  HINDU: 'hindu',
  MUSLIM: 'muslim',
  CHRISTIAN: 'christian',
  SIKH: 'sikh',
  BUDDHIST: 'buddhist',
  JAIN: 'jain',
  PARSI: 'parsi',
  OTHER: 'other'
};

// Education Levels
const EDUCATION_LEVELS = {
  HIGH_SCHOOL: 'high_school',
  DIPLOMA: 'diploma',
  BACHELOR: 'bachelor',
  MASTER: 'master',
  PHD: 'phd',
  PROFESSIONAL: 'professional',
  OTHER: 'other'
};

// Marital Status
const MARITAL_STATUS = {
  NEVER_MARRIED: 'never_married',
  DIVORCED: 'divorced',
  WIDOWED: 'widowed',
  SEPARATED: 'separated',
  AWAITING_DIVORCE: 'awaiting_divorce'
};

// Body Types
const BODY_TYPES = {
  SLIM: 'slim',
  AVERAGE: 'average',
  ATHLETIC: 'athletic',
  HEAVY: 'heavy'
};

// Complexions
const COMPLEXIONS = {
  VERY_FAIR: 'very_fair',
  FAIR: 'fair',
  WHEATISH: 'wheatish',
  WHEATISH_BROWN: 'wheatish_brown',
  DARK: 'dark'
};

// Family Types
const FAMILY_TYPES = {
  JOINT: 'joint',
  NUCLEAR: 'nuclear'
};

// Family Values
const FAMILY_VALUES = {
  ORTHODOX: 'orthodox',
  TRADITIONAL: 'traditional',
  MODERATE: 'moderate',
  LIBERAL: 'liberal'
};

// Diet Types
const DIET_TYPES = {
  VEGETARIAN: 'vegetarian',
  NON_VEGETARIAN: 'non_vegetarian',
  VEGAN: 'vegan',
  JAIN_VEGETARIAN: 'jain_vegetarian'
};

// Drinking Habits
const DRINKING_HABITS = {
  NEVER: 'never',
  OCCASIONALLY: 'occasionally',
  SOCIALLY: 'socially',
  REGULARLY: 'regularly'
};

// Smoking Habits
const SMOKING_HABITS = {
  NEVER: 'never',
  OCCASIONALLY: 'occasionally',
  SOCIALLY: 'socially',
  REGULARLY: 'regularly'
};

// Employment Types
const EMPLOYMENT_TYPES = {
  PRIVATE_COMPANY: 'private_company',
  GOVERNMENT: 'government',
  SELF_EMPLOYED: 'self_employed',
  BUSINESS: 'business',
  FREELANCER: 'freelancer',
  NOT_WORKING: 'not_working',
  STUDENT: 'student'
};

// Income Ranges
const INCOME_RANGES = {
  NO_INCOME: 'no_income',
  LESS_THAN_2L: '0-2',
  '2L_TO_5L': '2-5',
  '5L_TO_10L': '5-10',
  '10L_TO_15L': '10-15',
  '15L_TO_25L': '15-25',
  '25L_TO_50L': '25-50',
  '50L_TO_75L': '50-75',
  '75L_TO_1CR': '75-100',
  'ABOVE_1CR': '100+'
};

// Indian States
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
const ERROR_MESSAGES = {
  // Authentication
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  PHONE_ALREADY_EXISTS: 'Phone number already exists',
  UNAUTHORIZED: 'Unauthorized access',
  TOKEN_EXPIRED: 'Token has expired',
  INVALID_TOKEN: 'Invalid token',
  
  // Profile
  PROFILE_NOT_FOUND: 'Profile not found',
  PROFILE_INCOMPLETE: 'Profile is incomplete',
  PROFILE_SUSPENDED: 'Profile has been suspended',
  
  // Validation
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please provide a valid email address',
  INVALID_PHONE: 'Please provide a valid phone number',
  WEAK_PASSWORD: 'Password is too weak',
  
  // File Upload
  FILE_TOO_LARGE: 'File size is too large',
  INVALID_FILE_TYPE: 'Invalid file type',
  UPLOAD_FAILED: 'File upload failed',
  
  // General
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
  MAINTENANCE_MODE: 'Application is under maintenance'
};

// Success Messages
const SUCCESS_MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTRATION_SUCCESS: 'Registration successful',
  PASSWORD_RESET_SENT: 'Password reset link sent to your email',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  EMAIL_VERIFIED: 'Email verified successfully',
  
  // Profile
  PROFILE_CREATED: 'Profile created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PROFILE_DELETED: 'Profile deleted successfully',
  
  // General
  OPERATION_SUCCESS: 'Operation completed successfully',
  DATA_SAVED: 'Data saved successfully',
  FILE_UPLOADED: 'File uploaded successfully'
};

// Regex Patterns
const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  NAME: /^[a-zA-Z\s]{2,50}$/,
  PINCODE: /^[1-9][0-9]{5}$/,
  AADHAR: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
};

module.exports = {
  APP_CONSTANTS,
  USER_ROLES,
  PROFILE_STATUS,
  MATCH_STATUS,
  MESSAGE_TYPES,
  MESSAGE_STATUS,
  NOTIFICATION_TYPES,
  RELIGIONS,
  EDUCATION_LEVELS,
  MARITAL_STATUS,
  BODY_TYPES,
  COMPLEXIONS,
  FAMILY_TYPES,
  FAMILY_VALUES,
  DIET_TYPES,
  DRINKING_HABITS,
  SMOKING_HABITS,
  EMPLOYMENT_TYPES,
  INCOME_RANGES,
  INDIAN_STATES,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX_PATTERNS
};
