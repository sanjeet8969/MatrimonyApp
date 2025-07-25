import React from 'react';
import { Eye, Heart, MessageCircle, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileList = ({ 
  profiles = [], 
  loading = false, 
  onSendInterest, 
  onSaveProfile,
  onViewProfile,
  className = '' 
}) => {
  if (loading) {
    return <LoadingSpinner text="Loading profiles..." />;
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
        <p className="text-gray-600">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {profiles.map((profile) => (
        <div key={profile.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex space-x-6">
            <div className="flex-shrink-0">
              <img
                src={profile.photos?.[0] || '/api/placeholder/100/120'}
                alt={profile.name}
                className="w-24 h-32 object-cover rounded-lg"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <span>{profile.name}</span>
                    {profile.verified && (
                      <Badge variant="success" size="sm">Verified</Badge>
                    )}
                  </h3>
                  <p className="text-gray-600">
                    {profile.age} years, {profile.height} • {profile.location}
                  </p>
                </div>
                
                {profile.matchPercentage && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">
                      {profile.matchPercentage}%
                    </div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span>{profile.education}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{profile.profession}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{profile.location}</span>
                </div>
              </div>

              {profile.aboutMe && (
                <p className="text-gray-700 mb-4 line-clamp-2">{profile.aboutMe}</p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={Eye}
                    onClick={() => onViewProfile(profile.id)}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    icon={Heart}
                    onClick={() => onSendInterest(profile.id)}
                  >
                    Send Interest
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500">
                  Active {profile.lastActive}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
