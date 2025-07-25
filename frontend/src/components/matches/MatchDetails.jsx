import React from 'react';
import { X, Heart, MessageCircle, Share2 } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ProfileView from '../profile/ProfileView';

const MatchDetails = ({ 
  match, 
  isOpen, 
  onClose, 
  onSendInterest, 
  onMessage,
  onShare 
}) => {
  if (!match) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      className="p-0"
      showCloseButton={false}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {match.name}'s Profile
            </h2>
            {match.matchScore && (
              <p className="text-sm text-primary-600">
                {match.matchScore}% match compatibility
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              icon={Share2}
              onClick={() => onShare(match)}
            >
              Share
            </Button>
            
            <Button
              variant="outline"
              icon={MessageCircle}
              onClick={() => onMessage(match)}
            >
              Message
            </Button>
            
            <Button
              icon={Heart}
              onClick={() => onSendInterest(match)}
            >
              Send Interest
            </Button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <ProfileView
            profile={match}
            isOwnProfile={false}
            onSendInterest={() => onSendInterest(match)}
            onMessage={() => onMessage(match)}
            onShare={() => onShare(match)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default MatchDetails;
