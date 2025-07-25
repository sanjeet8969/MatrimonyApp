import React from 'react';
import { Clock, CheckCircle, X, Eye } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Avatar from '../ui/Avatar';

const InterestSentCard = ({ interest, onViewProfile, onWithdraw }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'declined':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        <Avatar
          src={interest.receiver.photo}
          name={interest.receiver.name}
          size="md"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900 truncate">
              {interest.receiver.name}
            </h3>
            <div className="flex items-center space-x-1">
              {getStatusIcon(interest.status)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interest.status)}`}>
                {interest.status.charAt(0).toUpperCase() + interest.status.slice(1)}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            {interest.receiver.age} years • {interest.receiver.location}
          </p>
          
          {interest.message && (
            <p className="text-sm text-gray-700 italic mb-3 line-clamp-2">
              "{interest.message}"
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Sent {new Date(interest.sentAt).toLocaleDateString()}
            </span>
            
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                icon={Eye}
                onClick={() => onViewProfile(interest.receiver.id)}
              >
                View
              </Button>
              
              {interest.status === 'pending' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onWithdraw(interest.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Withdraw
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InterestSentCard;
