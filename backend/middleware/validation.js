const { body, validationResult } = require('express-validator');

// Profile validation rules
const profileValidationRules = () => {
  return [
    body('personalDetails.firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters'),
    
    body('personalDetails.lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters'),
    
    body('personalDetails.dateOfBirth')
      .isISO8601()
      .withMessage('Valid date of birth is required')
      .custom((value) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 18 || age > 100) {
          throw new Error('Age must be between 18 and 100 years');
        }
        return true;
      }),
    
    body('personalDetails.gender')
      .isIn(['male', 'female'])
      .withMessage('Gender must be either male or female'),
    
    body('personalDetails.height')
      .optional()
      .matches(/^[4-7]'([0-9]|1[01])"$/)
      .withMessage('Height must be in format like 5\'6"'),
    
    body('contactDetails.phone')
      .optional()
      .isMobilePhone()
      .withMessage('Valid phone number is required'),
    
    body('contactDetails.address.city')
      .trim()
      .notEmpty()
      .withMessage('City is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('City name must be between 2 and 100 characters'),
    
    body('contactDetails.address.state')
      .trim()
      .notEmpty()
      .withMessage('State is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('State name must be between 2 and 100 characters'),
    
    body('contactDetails.address.country')
      .trim()
      .notEmpty()
      .withMessage('Country is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Country name must be between 2 and 100 characters'),
    
    body('religiousDetails.religion')
      .trim()
      .notEmpty()
      .withMessage('Religion is required'),
    
    body('educationDetails.highestQualification')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Qualification cannot exceed 200 characters'),
    
    body('aboutMe')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('About me cannot exceed 1000 characters'),
    
    body('hobbies')
      .optional()
      .isArray()
      .withMessage('Hobbies must be an array')
      .custom((hobbies) => {
        if (hobbies.length > 20) {
          throw new Error('Cannot have more than 20 hobbies');
        }
        return true;
      })
  ];
};

// Message validation rules
const messageValidationRules = () => {
  return [
    body('receiverId')
      .isMongoId()
      .withMessage('Valid receiver ID is required'),
    
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Message content is required')
      .isLength({ min: 1, max: 1000 })
      .withMessage('Message cannot exceed 1000 characters'),
    
    body('messageType')
      .optional()
      .isIn(['text', 'image', 'file'])
      .withMessage('Invalid message type')
  ];
};

// Interest request validation rules
const interestValidationRules = () => {
  return [
    body('receiverId')
      .isMongoId()
      .withMessage('Valid receiver ID is required'),
    
    body('message')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Message cannot exceed 500 characters')
  ];
};

// Validation error handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  profileValidationRules,
  messageValidationRules,
  interestValidationRules,
  validate
};
