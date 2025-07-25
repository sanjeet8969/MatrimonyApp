import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Star,
  Eye,
  Share2,
  Bookmark
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

const ProfileCard = ({ 
  profile, 
  onSendInterest, 
  onSaveProfile, 
  onViewProfile,
  showActions = true,
  compact = false 
}) => {
  const handleSendInterest = (e) => {
    e.preventDefault();
    onSendInterest(profile.id);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onSaveProfile(profile.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: `${profile.personalDetails.firstName}'s Profile`,
        url: window.location.origin + `/profile/${profile.id}`
      });
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${compact ? 'p-4' : ''}`}>
      {!compact && (
        <div className="relative">
          <img
            src={profile.photos?.[0] || '/api/placeholder/300/400'}
            alt={`${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`}
            className="w-full h-64 object-cover"
          />
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {profile.verified && (
              <Badge variant="success" size="sm">
                <Star className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {profile.premium && (
              <Badge variant="warning" size="sm">
                Premium
              </Badge>
            )}
          </div>

          {/* Match Score */}
          {profile.matchPercentage && (
            <div className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {profile.matchPercentage}% Match
            </div>
          )}

          {/* Online Status */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {profile.lastActive}
          </div>
        </div>
      )}
      
      <div className={compact ? 'flex space-x-4' : 'p-4'}>
        {compact && (
          <img
            src={profile.photos?.[0] || '/api/placeholder/100/120'}
            alt={`${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`}
            className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
          />
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {profile.personalDetails.firstName} {profile.personalDetails.lastName}
              </h3>
              <p className="text-gray-600 text-sm">
                {profile.personalDetails.age} years, {profile.personalDetails.height}
              </p>
            </div>
            <button
              onClick={handleSaveProfile}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{profile.contactDetails.address.city}, {profile.contactDetails.address.state}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{profile.educationDetails.highestQualification}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{profile.educationDetails.workAs}</span>
            </div>
          </div>

          {/* Common Interests */}
          {profile.commonInterests && profile.commonInterests.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">Common Interests</div>
              <div className="flex flex-wrap gap-1">
                {profile.commonInterests.slice(0, 3).map((interest, index) => (
                  <Badge key={index} variant="primary" size="sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {!compact && profile.aboutMe && (
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              {profile.aboutMe}
            </p>
          )}

          {showActions && (
            <div className="flex space-x-2">
              <Link
                to={`/profile/${profile.id}`}
                className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                View Profile
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSendInterest}
                icon={Heart}
                className="flex-1"
              >
                Interest
              </Button>
              <button
                onClick={handleShare}
                className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
