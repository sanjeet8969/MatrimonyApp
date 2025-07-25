const validator = require('validator');

// Email validation
const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!validator.isEmail(email)) {
    return { isValid: false, message: 'Please provide a valid email address' };
  }
  
  return { isValid: true };
};

// Phone validation
const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid Indian mobile number
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    return { isValid: false, message: 'Please provide a valid 10-digit mobile number' };
  }
  
  return { isValid: true };
};

// Name validation
const validateName = (name, fieldName = 'Name') => {
  if (!name) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  if (name.length < 2) {
    return { isValid: false, message: `${fieldName} must be at least 2 characters long` };
  }
  
  if (name.length > 50) {
    return { isValid: false, message: `${fieldName} must not exceed 50 characters` };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, message: `${fieldName} should only contain letters and spaces` };
  }
  
  return { isValid: true };
};

// Age validation
const validateAge = (dateOfBirth) => {
  if (!dateOfBirth) {
    return { isValid: false, message: 'Date of birth is required' };
  }
  
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  
  if (birthDate >= today) {
    return { isValid: false, message: 'Date of birth must be in the past' };
  }
  
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 18) {
    return { isValid: false, message: 'You must be at least 18 years old' };
  }
  
  if (age > 100) {
    return { isValid: false, message: 'Please provide a valid date of birth' };
  }
  
  return { isValid: true };
};

// Password validation
const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};

// Profile validation
const validateProfile = (profileData) => {
  const errors = {};
  
  // Validate personal details
  if (profileData.personalDetails) {
    const { firstName, lastName, dateOfBirth, height } = profileData.personalDetails;
    
    const firstNameValidation = validateName(firstName, 'First name');
    if (!firstNameValidation.isValid) {
      errors.firstName = firstNameValidation.message;
    }
    
    const lastNameValidation = validateName(lastName, 'Last name');
    if (!lastNameValidation.isValid) {
      errors.lastName = lastNameValidation.message;
    }
    
    const ageValidation = validateAge(dateOfBirth);
    if (!ageValidation.isValid) {
      errors.dateOfBirth = ageValidation.message;
    }
    
    if (height && !validator.isLength(height, { min: 3, max: 10 })) {
      errors.height = 'Please provide a valid height';
    }
  }
  
  // Validate contact details
  if (profileData.contactDetails) {
    const { email, phone } = profileData.contactDetails;
    
    if (email) {
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        errors.email = emailValidation.message;
      }
    }
    
    if (phone) {
      const phoneValidation = validatePhone(phone);
      if (!phoneValidation.isValid) {
        errors.phone = phoneValidation.message;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// File validation
const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
    required = false
  } = options;
  
  if (!file) {
    return {
      isValid: !required,
      message: required ? 'File is required' : null
    };
  }
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: `File size must be less than ${maxSize / (1024 * 1024)}MB`
    };
  }
  
  if (!allowedTypes.includes(file.mimetype)) {
    return {
      isValid: false,
      message: `File type must be one of: ${allowedTypes.join(', ')}`
    };
  }
  
  return { isValid: true };
};

// MongoDB ObjectId validation
const validateObjectId = (id) => {
  if (!id) {
    return { isValid: false, message: 'ID is required' };
  }
  
  if (!validator.isMongoId(id)) {
    return { isValid: false, message: 'Invalid ID format' };
  }
  
  return { isValid: true };
};

// URL validation
const validateURL = (url) => {
  if (!url) {
    return { isValid: false, message: 'URL is required' };
  }
  
  if (!validator.isURL(url)) {
    return { isValid: false, message: 'Please provide a valid URL' };
  }
  
  return { isValid: true };
};

module.exports = {
  validateEmail,
  validatePhone,
  validateName,
  validateAge,
  validatePassword,
  validateProfile,
  validateFile,
  validateObjectId,
  validateURL
};
