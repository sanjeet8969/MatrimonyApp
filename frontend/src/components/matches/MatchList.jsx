import React from 'react';
import MatchCard from './MatchCard';
import LoadingSpinner from '../common/LoadingSpinner';

const MatchList = ({ 
  matches = [], 
  loading = false, 
  onAccept, 
  onReject, 
  onViewProfile,
  type = 'suggestion',
  className = '' 
}) => {
  if (loading) {
    return <LoadingSpinner text="Loading matches..." />;
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">💝</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
        <p className="text-gray-600">Check back later for new matches</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          onAccept={onAccept}
          onReject={onReject}
          onViewProfile={onViewProfile}
          type={type}
        />
      ))}
    </div>
  );
};

export default MatchList;
