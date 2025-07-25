import React from 'react';
import { 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Users,
  Star,
  CheckCircle
} from 'lucide-react';
import Badge from '../common/Badge';

const ProfileSummary = ({ profile }) => {
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

  const summaryItems = [
    {
      icon: Calendar,
      label: 'Age',
      value: `${calculateAge(profile.personalDetails.dateOfBirth)} years`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: `${profile.contactDetails.address.city}, ${profile.contactDetails.address.state}`
    },
    {
      icon: GraduationCap,
      label: 'Education',
      value: profile.educationDetails.highestQualification
    },
    {
      icon: Briefcase,
      label: 'Profession',
      value: profile.educationDetails.workAs
    },
    {
      icon: Heart,
      label: 'Religion',
      value: profile.religiousDetails.religion
    },
    {
      icon: Users,
      label: 'Family Type',
      value: profile.familyDetails.familyType
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {profile.personalDetails.firstName} {profile.personalDetails.lastName}
          </h1>
          <div className="flex items-center space-x-4">
            {profile.verified && (
              <Badge variant="success">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {profile.premium && (
              <Badge variant="warning">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
            <span className="text-sm text-gray-500">
              Profile ID: {profile.id}
            </span>
          </div>
        </div>
        
        {profile.profileCompletion && (
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {profile.profileCompletion}%
            </div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        )}
      </div>

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {summaryItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="font-medium text-gray-900">{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* About Me */}
      {profile.aboutMe && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">About</h3>
          <p className="text-gray-700 leading-relaxed">{profile.aboutMe}</p>
        </div>
      )}

      {/* Hobbies */}
      {profile.hobbies && profile.hobbies.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Interests & Hobbies</h3>
          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map((hobby, index) => (
              <Badge key={index} variant="primary">
                {hobby}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSummary;
