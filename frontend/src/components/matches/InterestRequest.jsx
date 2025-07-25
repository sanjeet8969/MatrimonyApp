import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, X, Eye, MessageCircle } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const InterestRequest = ({ 
  request, 
  type = 'received', 
  onAccept, 
  onDecline, 
  onViewProfile 
}) => {
  const profile = type === 'received' ? request.sender : request.receiver;
  const isReceived = type === 'received';
  const isPending = request.status === 'pending';
  const isAccepted = request.status === 'accepted';

  return (
    <Card className="p-6">
      <div className="flex space-x-4">
        <img
          src={profile.photo || '/api/placeholder/80/100'}
          alt={profile.name}
          className="w-16 h-20 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{profile.name}</h3>
              <p className="text-sm text-gray-600">
                {profile.age} years • {profile.location}
              </p>
              <p className="text-sm text-gray-600">{profile.profession}</p>
            </div>
            
            <div className="text-right">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Message */}
          {request.message && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700 italic">"{request.message}"</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              icon={Eye}
              onClick={() => onViewProfile(profile.id)}
            >
              View Profile
            </Button>

            {isReceived && isPending && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  icon={Heart}
                  onClick={() => onAccept(request.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={X}
                  onClick={() => onDecline(request.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Decline
                </Button>
              </>
            )}

            {isAccepted && (
              <Button
                variant="primary"
                size="sm"
                icon={MessageCircle}
              >
                Message
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InterestRequest;
