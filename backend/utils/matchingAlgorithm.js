// Advanced matching algorithm for compatibility scoring
const calculateCompatibility = (userProfile, targetProfile) => {
  let totalScore = 0;
  let totalWeight = 0;

  // Weight factors for different criteria
  const weights = {
    age: 15,
    location: 20,
    religion: 25,
    education: 15,
    profession: 10,
    lifestyle: 10,
    hobbies: 5
  };

  // Age compatibility (±5 years gets full score)
  const ageScore = calculateAgeCompatibility(userProfile, targetProfile);
  totalScore += ageScore * weights.age;
  totalWeight += weights.age;

  // Location compatibility
  const locationScore = calculateLocationCompatibility(userProfile, targetProfile);
  totalScore += locationScore * weights.location;
  totalWeight += weights.location;

  // Religion compatibility
  const religionScore = calculateReligionCompatibility(userProfile, targetProfile);
  totalScore += religionScore * weights.religion;
  totalWeight += weights.religion;

  // Education compatibility
  const educationScore = calculateEducationCompatibility(userProfile, targetProfile);
  totalScore += educationScore * weights.education;
  totalWeight += weights.education;

  // Profession compatibility
  const professionScore = calculateProfessionCompatibility(userProfile, targetProfile);
  totalScore += professionScore * weights.profession;
  totalWeight += weights.profession;

  // Lifestyle compatibility
  const lifestyleScore = calculateLifestyleCompatibility(userProfile, targetProfile);
  totalScore += lifestyleScore * weights.lifestyle;
  totalWeight += weights.lifestyle;

  // Hobbies compatibility
  const hobbiesScore = calculateHobbiesCompatibility(userProfile, targetProfile);
  totalScore += hobbiesScore * weights.hobbies;
  totalWeight += weights.hobbies;

  // Calculate final compatibility percentage
  const compatibilityScore = Math.round((totalScore / totalWeight) * 100);
  return Math.min(100, Math.max(0, compatibilityScore));
};

const calculateAgeCompatibility = (userProfile, targetProfile) => {
  const userAge = calculateAge(userProfile.personalDetails.dateOfBirth);
  const targetAge = calculateAge(targetProfile.personalDetails.dateOfBirth);
  
  // Check if target age is within user's preferred range
  const { min: minAge, max: maxAge } = userProfile.partnerPreferences.ageRange || { min: 18, max: 60 };
  
  if (targetAge < minAge || targetAge > maxAge) {
    return 0; // Outside preferred range
  }
  
  // Calculate age difference score
  const ageDiff = Math.abs(userAge - targetAge);
  if (ageDiff <= 2) return 100;
  if (ageDiff <= 5) return 80;
  if (ageDiff <= 8) return 60;
  if (ageDiff <= 12) return 40;
  return 20;
};

const calculateLocationCompatibility = (userProfile, targetProfile) => {
  const userLocation = userProfile.contactDetails.address;
  const targetLocation = targetProfile.contactDetails.address;
  
  // Same city = 100%
  if (userLocation.city.toLowerCase() === targetLocation.city.toLowerCase()) {
    return 100;
  }
  
  // Same state = 70%
  if (userLocation.state.toLowerCase() === targetLocation.state.toLowerCase()) {
    return 70;
  }
  
  // Same country = 40%
  if (userLocation.country.toLowerCase() === targetLocation.country.toLowerCase()) {
    return 40;
  }
  
  // Different country = 20%
  return 20;
};

const calculateReligionCompatibility = (userProfile, targetProfile) => {
  const userReligion = userProfile.religiousDetails.religion.toLowerCase();
  const targetReligion = targetProfile.religiousDetails.religion.toLowerCase();
  
  // Same religion = 100%
  if (userReligion === targetReligion) {
    // Same caste adds bonus
    const userCaste = userProfile.religiousDetails.caste?.toLowerCase() || '';
    const targetCaste = targetProfile.religiousDetails.caste?.toLowerCase() || '';
    
    if (userCaste && targetCaste && userCaste === targetCaste) {
      return 100;
    }
    return 90;
  }
  
  // Different religion based on compatibility matrix
  const religionCompatibility = {
    'hindu': { 'hindu': 100, 'sikh': 60, 'buddhist': 50, 'jain': 70 },
    'muslim': { 'muslim': 100 },
    'christian': { 'christian': 100 },
    'sikh': { 'sikh': 100, 'hindu': 60 },
    'buddhist': { 'buddhist': 100, 'hindu': 50 },
    'jain': { 'jain': 100, 'hindu': 70 }
  };
  
  return religionCompatibility[userReligion]?.[targetReligion] || 10;
};

const calculateEducationCompatibility = (userProfile, targetProfile) => {
  const educationLevels = {
    'high school': 1,
    'diploma': 2,
    'bachelor': 3,
    'master': 4,
    'phd': 5,
    'professional': 4
  };
  
  const userEdu = userProfile.educationDetails.highestQualification?.toLowerCase() || '';
  const targetEdu = targetProfile.educationDetails.highestQualification?.toLowerCase() || '';
  
  const userLevel = educationLevels[userEdu] || 3;
  const targetLevel = educationLevels[targetEdu] || 3;
  
  const diff = Math.abs(userLevel - targetLevel);
  
  if (diff === 0) return 100;
  if (diff === 1) return 80;
  if (diff === 2) return 60;
  return 40;
};

const calculateProfessionCompatibility = (userProfile, targetProfile) => {
  const userProfession = userProfile.educationDetails.workAs?.toLowerCase() || '';
  const targetProfession = targetProfile.educationDetails.workAs?.toLowerCase() || '';
  
  // Professional compatibility groups
  const professionGroups = {
    'it': ['software engineer', 'developer', 'programmer', 'system administrator', 'data scientist'],
    'medical': ['doctor', 'nurse', 'dentist', 'pharmacist', 'medical'],
    'education': ['teacher', 'professor', 'lecturer', 'principal', 'education'],
    'business': ['manager', 'executive', 'consultant', 'analyst', 'entrepreneur'],
    'engineering': ['engineer', 'architect', 'construction', 'mechanical', 'electrical'],
    'finance': ['accountant', 'banker', 'financial', 'auditor', 'investment'],
    'government': ['officer', 'clerk', 'administrator', 'civil service', 'government']
  };
  
  // Find profession groups
  let userGroup = null;
  let targetGroup = null;
  
  for (const [group, professions] of Object.entries(professionGroups)) {
    if (professions.some(prof => userProfession.includes(prof))) {
      userGroup = group;
    }
    if (professions.some(prof => targetProfession.includes(prof))) {
      targetGroup = group;
    }
  }
  
  if (userGroup && targetGroup) {
    if (userGroup === targetGroup) return 100;
    
    // Compatible profession groups
    const compatibility = {
      'it': { 'engineering': 80, 'business': 70 },
      'medical': { 'medical': 100, 'education': 60 },
      'education': { 'government': 70, 'medical': 60 },
      'business': { 'finance': 90, 'it': 70 },
      'engineering': { 'it': 80, 'business': 60 },
      'finance': { 'business': 90 },
      'government': { 'education': 70 }
    };
    
    return compatibility[userGroup]?.[targetGroup] || 50;
  }
  
  return 60; // Default score for unmatched professions
};

const calculateLifestyleCompatibility = (userProfile, targetProfile) => {
  const userLifestyle = userProfile.lifestyle || {};
  const targetLifestyle = targetProfile.lifestyle || {};
  
  let score = 0;
  let factors = 0;
  
  // Smoking compatibility
  if (userLifestyle.smokingHabits && targetLifestyle.smokingHabits) {
    const smokingScore = getLifestyleScore(userLifestyle.smokingHabits, targetLifestyle.smokingHabits);
    score += smokingScore;
    factors++;
  }
  
  // Drinking compatibility
  if (userLifestyle.drinkingHabits && targetLifestyle.drinkingHabits) {
    const drinkingScore = getLifestyleScore(userLifestyle.drinkingHabits, targetLifestyle.drinkingHabits);
    score += drinkingScore;
    factors++;
  }
  
  // Dietary compatibility
  if (userLifestyle.dietaryHabits && targetLifestyle.dietaryHabits) {
    const dietScore = getDietaryScore(userLifestyle.dietaryHabits, targetLifestyle.dietaryHabits);
    score += dietScore;
    factors++;
  }
  
  return factors > 0 ? Math.round(score / factors) : 70;
};

const calculateHobbiesCompatibility = (userProfile, targetProfile) => {
  const userHobbies = userProfile.hobbies || [];
  const targetHobbies = targetProfile.hobbies || [];
  
  if (userHobbies.length === 0 || targetHobbies.length === 0) {
    return 50; // Default score when hobbies are not specified
  }
  
  // Find common hobbies
  const commonHobbies = userHobbies.filter(hobby => 
    targetHobbies.some(targetHobby => 
      targetHobby.toLowerCase().includes(hobby.toLowerCase()) ||
      hobby.toLowerCase().includes(targetHobby.toLowerCase())
    )
  );
  
  const totalHobbies = Math.max(userHobbies.length, targetHobbies.length);
  const commonPercentage = (commonHobbies.length / totalHobbies) * 100;
  
  // Bonus for having common hobbies
  if (commonHobbies.length > 0) {
    return Math.min(100, 50 + commonPercentage);
  }
  
  return 30; // Low score for no common hobbies
};

// Helper functions
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

const getLifestyleScore = (userHabit, targetHabit) => {
  const habitLevels = {
    'never': 4,
    'occasionally': 3,
    'socially': 2,
    'regularly': 1
  };
  
  const userLevel = habitLevels[userHabit.toLowerCase()] || 2;
  const targetLevel = habitLevels[targetHabit.toLowerCase()] || 2;
  
  const diff = Math.abs(userLevel - targetLevel);
  
  if (diff === 0) return 100;
  if (diff === 1) return 75;
  if (diff === 2) return 50;
  return 25;
};

const getDietaryScore = (userDiet, targetDiet) => {
  const dietMap = {
    'vegetarian': ['vegetarian', 'vegan', 'jain'],
    'non-vegetarian': ['non-vegetarian'],
    'vegan': ['vegan', 'vegetarian'],
    'jain': ['jain', 'vegetarian', 'vegan']
  };
  
  const userDietLower = userDiet.toLowerCase();
  const targetDietLower = targetDiet.toLowerCase();
  
  if (userDietLower === targetDietLower) return 100;
  
  const compatibleDiets = dietMap[userDietLower] || [];
  if (compatibleDiets.includes(targetDietLower)) return 80;
  
  return 30;
};

// Generate match suggestions based on user preferences
const generateMatchSuggestions = (userProfile, potentialMatches) => {
  const scoredMatches = potentialMatches.map(match => ({
    profile: match,
    compatibilityScore: calculateCompatibility(userProfile, match),
    matchReasons: getMatchReasons(userProfile, match)
  }));
  
  // Sort by compatibility score
  return scoredMatches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
};

const getMatchReasons = (userProfile, targetProfile) => {
  const reasons = [];
  
  // Age compatibility
  const userAge = calculateAge(userProfile.personalDetails.dateOfBirth);
  const targetAge = calculateAge(targetProfile.personalDetails.dateOfBirth);
  const ageDiff = Math.abs(userAge - targetAge);
  
  if (ageDiff <= 3) {
    reasons.push('Similar age group');
  }
  
  // Location
  if (userProfile.contactDetails.address.city.toLowerCase() === 
      targetProfile.contactDetails.address.city.toLowerCase()) {
    reasons.push('Same city');
  } else if (userProfile.contactDetails.address.state.toLowerCase() === 
             targetProfile.contactDetails.address.state.toLowerCase()) {
    reasons.push('Same state');
  }
  
  // Religion
  if (userProfile.religiousDetails.religion.toLowerCase() === 
      targetProfile.religiousDetails.religion.toLowerCase()) {
    reasons.push('Same religion');
  }
  
  // Education level
  const educationLevels = {
    'high school': 1, 'diploma': 2, 'bachelor': 3, 'master': 4, 'phd': 5
  };
  
  const userEduLevel = educationLevels[userProfile.educationDetails.highestQualification?.toLowerCase()] || 3;
  const targetEduLevel = educationLevels[targetProfile.educationDetails.highestQualification?.toLowerCase()] || 3;
  
  if (Math.abs(userEduLevel - targetEduLevel) <= 1) {
    reasons.push('Compatible education level');
  }
  
  // Common hobbies
  const userHobbies = userProfile.hobbies || [];
  const targetHobbies = targetProfile.hobbies || [];
  const commonHobbies = userHobbies.filter(hobby => 
    targetHobbies.some(targetHobby => 
      targetHobby.toLowerCase().includes(hobby.toLowerCase())
    )
  );
  
  if (commonHobbies.length > 0) {
    reasons.push(`Common interests: ${commonHobbies.slice(0, 2).join(', ')}`);
  }
  
  return reasons;
};

module.exports = {
  calculateCompatibility,
  generateMatchSuggestions,
  getMatchReasons
};
