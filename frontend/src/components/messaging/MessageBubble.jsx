import React from 'react';
import { Check, CheckCheck, Clock, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const MessageBubble = ({ message, currentUserId }) => {
  const isOwnMessage = message.senderId === currentUserId;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary-600" />;
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <img
              src={message.fileUrl}
              alt="Shared image"
              className="max-w-xs rounded-lg cursor-pointer"
              onClick={() => window.open(message.fileUrl, '_blank')}
            />
            {message.content && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg max-w-xs">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {message.fileName || 'File'}
              </p>
              <p className="text-xs text-gray-500">
                {message.fileSize || 'Unknown size'}
              </p>
            </div>
            <button
              onClick={() => window.open(message.fileUrl, '_blank')}
              className="text-primary-600 hover:text-primary-700"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        );
      
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwnMessage
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {renderMessageContent()}
        </div>
        
        <div className={`flex items-center space-x-1 mt-1 ${
          isOwnMessage ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
          {isOwnMessage && getStatusIcon(message.status)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
