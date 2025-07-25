import React from 'react';
import { Heart, X, Eye, MessageCircle, Star } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

const MatchCard = ({ 
  match, 
  onAccept, 
  onReject, 
  onViewProfile, 
  type = 'suggestion' 
}) => {
  const handleAccept = () => {
    onAccept(match.id);
  };

  const handleReject = () => {
    onReject(match.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={match.photo || '/api/placeholder/300/400'}
          alt={match.name}
          className="w-full h-56 object-cover"
        />
        
        {/* Match Score */}
        {match.matchScore && (
          <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {match.matchScore}% Match
          </div>
        )}

        {/* Status Badge */}
        {match.status && (
          <div className="absolute top-3 right-3">
            <Badge 
              variant={
                match.status === 'accepted' ? 'success' : 
                match.status === 'pending' ? 'warning' : 'danger'
              }
            >
              {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{match.name}</h3>
            <p className="text-gray-600 text-sm">{match.age} years • {match.location}</p>
          </div>
          
          {match.verified && (
            <Star className="w-5 h-5 text-green-500 fill-current" />
          )}
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Education:</span> {match.education}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Profession:</span> {match.profession}
          </p>
        </div>

        {/* Common Interests */}
        {match.commonInterests && match.commonInterests.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Common Interests</p>
            <div className="flex flex-wrap gap-1">
              {match.commonInterests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="primary" size="sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={Eye}
            onClick={() => onViewProfile(match.id)}
            className="flex-1"
          >
            View
          </Button>

          {type === 'suggestion' && (
            <>
              <Button
                variant="success"
                size="sm"
                icon={Heart}
                onClick={handleAccept}
                className="flex-1"
              >
                Accept
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={X}
                onClick={handleReject}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Pass
              </Button>
            </>
          )}

          {type === 'mutual' && (
            <Button
              variant="primary"
              size="sm"
              icon={MessageCircle}
              className="flex-1"
            >
              Message
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
