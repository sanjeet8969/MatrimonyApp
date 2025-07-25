import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { User, Search } from 'lucide-react';
import Input from '../common/Input';

const ConversationList = ({ 
  conversations = [], 
  currentChat, 
  onSelectChat, 
  searchQuery, 
  onSearchChange 
}) => {
  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
        <Input
          icon={Search}
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={currentChat?.id === conversation.id}
              onClick={() => onSelectChat(conversation)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const ConversationItem = ({ conversation, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
        isActive 
          ? 'bg-primary-50 border-primary-500' 
          : 'border-transparent'
      }`}
    >
      <div className="relative">
        <img
          src={conversation.participant.avatar || '/api/placeholder/40/40'}
          alt={conversation.participant.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {conversation.participant.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={`font-medium truncate ${
            conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
          }`}>
            {conversation.participant.name}
          </h3>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className={`text-sm truncate ${
            conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
          }`}>
            {conversation.lastMessage.senderId === 'currentUser' ? 'You: ' : ''}
            {conversation.lastMessage.content}
          </p>
          
          {conversation.unreadCount > 0 && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
