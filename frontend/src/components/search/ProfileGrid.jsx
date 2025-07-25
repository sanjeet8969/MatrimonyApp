import React from 'react';
import ProfileCard from '../profile/ProfileCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileGrid = ({ 
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
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onSendInterest={onSendInterest}
          onSaveProfile={onSaveProfile}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  );
};

export default ProfileGrid;
