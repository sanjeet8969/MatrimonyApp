const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = {
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },

  // Password Configuration
  password: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12,
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false
  },

  // Account Security
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    passwordResetExpiry: 60 * 60 * 1000, // 1 hour
    emailVerificationExpiry: 24 * 60 * 60 * 1000 // 24 hours
  },

  // OAuth Configuration
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET,
      redirectUri: process.env.FACEBOOK_REDIRECT_URI
    }
  }
};

// JWT Token Generation
const generateToken = (payload, type = 'access') => {
  const config = type === 'refresh' 
    ? { secret: authConfig.jwt.refreshSecret, expiresIn: authConfig.jwt.refreshExpiresIn }
    : { secret: authConfig.jwt.secret, expiresIn: authConfig.jwt.expiresIn };

  return jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
};

// JWT Token Verification
const verifyToken = (token, type = 'access') => {
  const secret = type === 'refresh' 
    ? authConfig.jwt.refreshSecret 
    : authConfig.jwt.secret;

  return jwt.verify(token, secret);
};

// Password Hashing
const hashPassword = async (password) => {
  return await bcrypt.hash(password, authConfig.password.saltRounds);
};

// Password Comparison
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Password Validation
const validatePassword = (password) => {
  const { minLength, requireUppercase, requireLowercase, requireNumbers } = authConfig.password;
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Generate Random Token
const generateRandomToken = (length = 32) => {
  return require('crypto').randomBytes(length).toString('hex');
};

module.exports = {
  authConfig,
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  validatePassword,
  generateRandomToken
};
