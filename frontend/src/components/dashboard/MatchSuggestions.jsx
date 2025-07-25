import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import ProfileCard from '../profile/ProfileCard';

const MatchSuggestions = ({ 
  matches = [], 
  onSendInterest, 
  onSaveProfile,
  loading = false 
}) => {
  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (matches.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Matches</h2>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-4">No matches found yet</p>
          <Link to="/search">
            <Button>Browse Profiles</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top Matches</h2>
        <Link 
          to="/matches"
          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.slice(0, 3).map((match) => (
          <ProfileCard
            key={match.id}
            profile={match}
            onSendInterest={onSendInterest}
            onSaveProfile={onSaveProfile}
            compact={true}
          />
        ))}
      </div>
    </Card>
  );
};

export default MatchSuggestions;
