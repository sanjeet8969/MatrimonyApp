import React from 'react';
import { 
  Edit, 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar,
  GraduationCap,
  Briefcase,
  Users,
  Star
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import ProfileGallery from './ProfileGallery';
import VerificationBadge from '../feature/VerificationBadge';

const ProfileView = ({ 
  profile, 
  isOwnProfile = false, 
  onEdit, 
  onSendInterest, 
  onMessage,
  onShare 
}) => {
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

  const profileSections = [
    {
      title: 'Basic Information',
      items: [
        { icon: Calendar, label: 'Age', value: `${calculateAge(profile.personalDetails?.dateOfBirth)} years` },
        { icon: MapPin, label: 'Location', value: `${profile.contactDetails?.address?.city}, ${profile.contactDetails?.address?.state}` },
        { icon: GraduationCap, label: 'Education', value: profile.educationDetails?.highestQualification },
        { icon: Briefcase, label: 'Profession', value: profile.educationDetails?.workAs },
        { icon: Users, label: 'Family Type', value: profile.familyDetails?.familyType }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={profile.photos?.[0]?.url || '/api/placeholder/200/240'}
                alt={`${profile.personalDetails?.firstName} ${profile.personalDetails?.lastName}`}
                className="w-48 h-56 object-cover rounded-2xl"
              />
              <div className="absolute top-3 right-3 flex flex-col space-y-2">
                {profile.verified && <VerificationBadge type="verified" />}
                {profile.premium && <VerificationBadge type="premium" />}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile.personalDetails?.firstName} {profile.personalDetails?.lastName}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {calculateAge(profile.personalDetails?.dateOfBirth)} years • {profile.personalDetails?.height}
                </p>
                
                {profile.profileCompletion && (
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium text-primary-600">
                      {profile.profileCompletion}% Profile Complete
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${profile.profileCompletion}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4 sm:mt-0">
                {isOwnProfile ? (
                  <Button onClick={onEdit} icon={Edit}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={onShare}
                      icon={Share2}
                      size="sm"
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onMessage}
                      icon={MessageCircle}
                    >
                      Message
                    </Button>
                    <Button
                      onClick={onSendInterest}
                      icon={Heart}
                    >
                      Send Interest
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileSections[0].items.map((item, index) => {
                const Icon = item.icon;
                if (!item.value) return null;
                
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
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      {profile.photos && profile.photos.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Photos</h2>
          <ProfileGallery
            photos={profile.photos}
            name={`${profile.personalDetails?.firstName} ${profile.personalDetails?.lastName}`}
          />
        </div>
      )}

      {/* About Me */}
      {profile.aboutMe && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{profile.aboutMe}</p>
        </div>
      )}

      {/* Interests & Hobbies */}
      {profile.hobbies && profile.hobbies.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Interests & Hobbies</h2>
          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map((hobby, index) => (
              <Badge key={index} variant="primary">
                {hobby}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Details</h3>
          <div className="space-y-4">
            {[
              { label: 'Height', value: profile.personalDetails?.height },
              { label: 'Body Type', value: profile.personalDetails?.bodyType },
              { label: 'Complexion', value: profile.personalDetails?.complexion },
              { label: 'Blood Group', value: profile.personalDetails?.bloodGroup }
            ].map((item, index) => (
              item.value && (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Religious Details */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Religious Details</h3>
          <div className="space-y-4">
            {[
              { label: 'Religion', value: profile.religiousDetails?.religion },
              { label: 'Caste', value: profile.religiousDetails?.caste },
              { label: 'Mother Tongue', value: profile.religiousDetails?.mothertongue },
              { label: 'Manglik', value: profile.religiousDetails?.managlik ? 'Yes' : 'No' }
            ].map((item, index) => (
              item.value && (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Education & Career */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Education & Career</h3>
          <div className="space-y-4">
            {[
              { label: 'Education', value: profile.educationDetails?.highestQualification },
              { label: 'College', value: profile.educationDetails?.college },
              { label: 'Profession', value: profile.educationDetails?.workAs },
              { label: 'Annual Income', value: profile.educationDetails?.annualIncome }
            ].map((item, index) => (
              item.value && (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Family Details */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Family Details</h3>
          <div className="space-y-4">
            {[
              { label: 'Family Type', value: profile.familyDetails?.familyType },
              { label: 'Family Status', value: profile.familyDetails?.familyStatus },
              { label: 'Family Values', value: profile.familyDetails?.familyValues },
              { label: 'Father\'s Occupation', value: profile.familyDetails?.fatherOccupation },
              { label: 'Mother\'s Occupation', value: profile.familyDetails?.motherOccupation }
            ].map((item, index) => (
              item.value && (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Lifestyle */}
      {profile.lifestyle && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Lifestyle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Drinking', value: profile.lifestyle.drinkingHabits },
              { label: 'Smoking', value: profile.lifestyle.smokingHabits },
              { label: 'Diet', value: profile.lifestyle.dietaryHabits },
              { label: 'Exercise', value: profile.lifestyle.exerciseHabits }
            ].map((item, index) => (
              item.value && (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                  <div className="font-medium text-gray-900">{item.value}</div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
