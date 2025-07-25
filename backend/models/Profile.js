const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    height: String,
    weight: String,
    bodyType: String,
    complexion: String,
    bloodGroup: String,
    disability: String
  },
  contactDetails: {
    phone: String,
    alternatePhone: String,
    address: {
      street: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: String
    }
  },
  religiousDetails: {
    religion: { type: String, required: true },
    caste: String,
    subCaste: String,
    mothertongue: String,
    gothra: String,
    managlik: Boolean
  },
  educationDetails: {
    highestQualification: String,
    college: String,
    specialization: String,
    workingWith: String,
    workAs: String,
    annualIncome: String
  },
  familyDetails: {
    familyType: String,
    familyStatus: String,
    familyValues: String,
    fatherOccupation: String,
    motherOccupation: String,
    brothers: Number,
    sisters: Number
  },
  partnerPreferences: {
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 60 }
    },
    heightRange: {
      min: String,
      max: String
    },
    preferredLocation: [String],
    education: [String],
    occupation: [String],
    income: {
      min: Number,
      max: Number
    },
    caste: [String],
    religion: [String]
  },
  photos: [{
    url: String,
    public_id: String,
    isPrimary: { type: Boolean, default: false }
  }],
  aboutMe: String,
  hobbies: [String],
  lifestyle: {
    drinkingHabits: String,
    smokingHabits: String,
    dietaryHabits: String,
    exerciseHabits: String
  },
  profileCompletion: {
    type: Number,
    default: 0
  },
  isProfileVisible: {
    type: Boolean,
    default: true
  },
  isPremiumUser: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate profile completion percentage
profileSchema.methods.calculateCompletion = function() {
  let completion = 0;
  const sections = [
    this.personalDetails,
    this.contactDetails,
    this.religiousDetails,
    this.educationDetails,
    this.familyDetails,
    this.partnerPreferences,
    this.aboutMe,
    this.photos.length > 0
  ];
  
  sections.forEach(section => {
    if (section) completion += 12.5;
  });
  
  this.profileCompletion = Math.round(completion);
  return this.profileCompletion;
};

module.exports = mongoose.model('Profile', profileSchema);
