import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import Button from '../common/Button';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { useResponsive } from '../../hooks/useResponsive';

const ChatWindow = ({ 
  conversation, 
  messages = [], 
  onSendMessage, 
  onFileUpload,
  onClose,
  loading = false 
}) => {
  const { isMobile } = useResponsive();
  const messagesEndRef = useRef(null);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
          <p className="text-gray-600">Choose a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          
          <img
            src={conversation.participant.avatar || '/api/placeholder/40/40'}
            alt={conversation.participant.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          
          <div>
            <h3 className="font-medium text-gray-900">{conversation.participant.name}</h3>
            <p className="text-sm text-gray-600">
              {conversation.participant.isOnline ? (
                <span className="text-green-600">Online</span>
              ) : (
                `Last seen ${conversation.participant.lastSeen}`
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" icon={Phone}>
            {!isMobile && 'Call'}
          </Button>
          <Button size="sm" variant="outline" icon={Video}>
            {!isMobile && 'Video'}
          </Button>
          
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 w-48">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                  View Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                  Block User
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600">
                  Delete Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        onFileUpload={onFileUpload}
        disabled={loading}
      />
    </div>
  );
};

export default ChatWindow;
