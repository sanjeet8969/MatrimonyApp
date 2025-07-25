import React from 'react';
import { MessageCircle, Heart, Calendar } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Avatar from '../ui/Avatar';

const MutualMatchCard = ({ match, onStartChat, onViewProfile }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar
            src={match.photo}
            name={match.name}
            size="lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-current" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{match.name}</h3>
              <p className="text-sm text-gray-600">
                {match.age} years • {match.location}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-primary-600">
                {match.matchScore}% Match
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                Matched {new Date(match.matchedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Education:</span> {match.education}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Profession:</span> {match.profession}
            </p>
          </div>
          
          {match.commonInterests && match.commonInterests.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Common Interests</p>
              <div className="flex flex-wrap gap-1">
                {match.commonInterests.slice(0, 3).map((interest, index) => (
                  <span key={index} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
                {match.commonInterests.length > 3 && (
                  <span className="text-xs text-gray-500">+{match.commonInterests.length - 3} more</span>
                )}
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="primary"
              icon={MessageCircle}
              onClick={() => onStartChat(match.id)}
              className="flex-1"
            >
              Start Chat
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewProfile(match.id)}
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MutualMatchCard;
