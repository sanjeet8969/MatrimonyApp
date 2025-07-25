import React from 'react';
import { Heart, X, Eye, Calendar } from 'lucide-react';
import Button from '../common/Button';
import Avatar from '../ui/Avatar';

const InterestRequests = ({ 
  requests = [], 
  onAccept, 
  onDecline, 
  onViewProfile,
  loading = false 
}) => {
  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No interest requests</h3>
        <p className="text-gray-600">Interest requests will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start space-x-4">
            <Avatar
              src={request.sender.photo}
              name={request.sender.name}
              size="lg"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{request.sender.name}</h3>
                  <p className="text-sm text-gray-600">
                    {request.sender.age} years • {request.sender.location}
                  </p>
                  <p className="text-sm text-gray-600">{request.sender.profession}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(request.sentAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {request.message && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 italic">
                    "{request.message}"
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  icon={Eye}
                  onClick={() => onViewProfile(request.sender.id)}
                >
                  View Profile
                </Button>
                
                <Button
                  size="sm"
                  variant="success"
                  icon={Heart}
                  onClick={() => onAccept(request.id)}
                  loading={loading}
                >
                  Accept
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  icon={X}
                  onClick={() => onDecline(request.id)}
                  loading={loading}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterestRequests;
