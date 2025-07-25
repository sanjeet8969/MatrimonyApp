import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { 
  MessageCircle, 
  Send, 
  Search,
  Phone,
  Video,
  MoreVertical,
  Image,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Clock,
  User,
  ArrowLeft,
  Settings,
  Archive,
  Trash2,
  Flag,
  Block
} from 'lucide-react';
import toast from 'react-hot-toast';

const Messages = () => {
  const { user } = useAuth();
  const { isMobile } = useResponsive();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [showChatInfo, setShowChatInfo] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mock conversations data
  const mockConversations = [
    {
      id: '1',
      participant: {
        id: 'u1',
        name: 'Priya Sharma',
        avatar: '/api/placeholder/50/50',
        status: 'online',
        lastSeen: new Date()
      },
      lastMessage: {
        content: 'Thank you for accepting my interest! 😊',
        timestamp: new Date(Date.now() - 300000), // 5 mins ago
        senderId: 'u1',
        isRead: false
      },
      unreadCount: 2,
      isPinned: true
    },
    {
      id: '2',
      participant: {
        id: 'u2',
        name: 'Anita Patel',
        avatar: '/api/placeholder/50/50',
        status: 'offline',
        lastSeen: new Date(Date.now() - 3600000) // 1 hour ago
      },
      lastMessage: {
        content: 'Looking forward to hearing from you',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        senderId: 'u2',
        isRead: true
      },
      unreadCount: 0,
      isPinned: false
    },
    {
      id: '3',
      participant: {
        id: 'u3',
        name: 'Meera Gupta',
        avatar: '/api/placeholder/50/50',
        status: 'online',
        lastSeen: new Date()
      },
      lastMessage: {
        content: 'Hi! Nice to connect with you',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        senderId: user?.id,
        isRead: true
      },
      unreadCount: 0,
      isPinned: false
    }
  ];

  // Mock messages for current chat
  const mockMessages = [
    {
      id: 'm1',
      senderId: 'u1',
      content: 'Hi! Thank you for showing interest in my profile.',
      timestamp: new Date(Date.now() - 1800000), // 30 mins ago
      type: 'text',
      status: 'delivered'
    },
    {
      id: 'm2',
      senderId: user?.id,
      content: 'Hello Priya! I found your profile very interesting. Would love to get to know you better.',
      timestamp: new Date(Date.now() - 1500000), // 25 mins ago
      type: 'text',
      status: 'read'
    },
    {
      id: 'm3',
      senderId: 'u1',
      content: 'That\'s great! I\'d love to know more about you too. What are your hobbies?',
      timestamp: new Date(Date.now() - 1200000), // 20 mins ago
      type: 'text',
      status: 'delivered'
    },
    {
      id: 'm4',
      senderId: user?.id,
      content: 'I enjoy reading, traveling, and photography. I also love cooking and trying new recipes. What about you?',
      timestamp: new Date(Date.now() - 900000), // 15 mins ago
      type: 'text',
      status: 'read'
    },
    {
      id: 'm5',
      senderId: 'u1',
      content: 'We have so much in common! I love cooking too and I enjoy yoga and dancing.',
      timestamp: new Date(Date.now() - 600000), // 10 mins ago
      type: 'text',
      status: 'delivered'
    },
    {
      id: 'm6',
      senderId: 'u1',
      content: 'Thank you for accepting my interest! 😊',
      timestamp: new Date(Date.now() - 300000), // 5 mins ago
      type: 'text',
      status: 'delivered'
    }
  ];

  useEffect(() => {
    setConversations(mockConversations);
    setOnlineUsers(new Set(['u1', 'u3']));
  }, []);

  useEffect(() => {
    if (currentChat) {
      setMessages(mockMessages);
      scrollToBottom();
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectChat = (conversation) => {
    setCurrentChat(conversation);
    // Mark messages as read
    if (conversation.unreadCount > 0) {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversation.id
            ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } }
            : conv
        )
      );
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentChat) return;

    const messageData = {
      id: `m${Date.now()}`,
      senderId: user?.id,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      status: 'sending'
    };

    // Add message to current chat
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');

    // Update conversation list
    setConversations(prev =>
      prev.map(conv =>
        conv.id === currentChat.id
          ? {
              ...conv,
              lastMessage: {
                content: messageData.content,
                timestamp: messageData.timestamp,
                senderId: messageData.senderId,
                isRead: false
              }
            }
          : conv
      )
    );

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update message status
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageData.id
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    } catch (error) {
      toast.error('Failed to send message');
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageData.id
            ? { ...msg, status: 'failed' }
            : msg
        )
      );
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const messageData = {
      id: `m${Date.now()}`,
      senderId: user?.id,
      content: file.name,
      timestamp: new Date(),
      type: file.type.startsWith('image/') ? 'image' : 'file',
      fileUrl: URL.createObjectURL(file),
      status: 'sending'
    };

    setMessages(prev => [...prev, messageData]);

    try {
      // Mock file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageData.id
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );

      toast.success('File sent successfully');
    } catch (error) {
      toast.error('Failed to send file');
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  const getMessageStatus = (message) => {
    if (message.senderId !== user?.id) return null;

    switch (message.status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary-600" />;
      case 'failed':
        return <span className="text-red-500 text-xs">Failed</span>;
      default:
        return null;
    }
  };

  const ConversationItem = ({ conversation }) => (
    <div
      onClick={() => handleSelectChat(conversation)}
      className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        currentChat?.id === conversation.id ? 'bg-primary-50 border-r-2 border-primary-500' : ''
      }`}
    >
      <div className="relative">
        <img
          src={conversation.participant.avatar}
          alt={conversation.participant.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {onlineUsers.has(conversation.participant.id) && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-900 truncate">
            {conversation.participant.name}
          </h3>
          <div className="flex items-center space-x-2">
            {conversation.isPinned && (
              <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
            )}
            <span className="text-xs text-gray-500">
              {formatTime(conversation.lastMessage.timestamp)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className={`text-sm truncate ${
            conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
          }`}>
            {conversation.lastMessage.senderId === user?.id ? 'You: ' : ''}
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

  const MessageBubble = ({ message }) => {
    const isOwn = message.senderId === user?.id;
    
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
          {message.type === 'image' ? (
            <div className={`rounded-2xl p-2 ${
              isOwn ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}>
              <img
                src={message.fileUrl}
                alt="Shared image"
                className="max-w-full h-auto rounded-lg mb-2"
              />
              <p className="text-sm">{message.content}</p>
            </div>
          ) : message.type === 'file' ? (
            <div className={`rounded-2xl p-4 ${
              isOwn ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="flex items-center space-x-3">
                <Paperclip className="w-5 h-5" />
                <span className="text-sm">{message.content}</span>
              </div>
            </div>
          ) : (
            <div className={`rounded-2xl px-4 py-2 ${
              isOwn ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}>
              <p className="text-sm">{message.content}</p>
            </div>
          )}
          
          <div className={`flex items-center space-x-1 mt-1 ${
            isOwn ? 'justify-end' : 'justify-start'
          }`}>
            <span className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </span>
            {getMessageStatus(message)}
          </div>
        </div>
      </div>
    );
  };

  if (isMobile && currentChat) {
    // Mobile view - show only chat when a conversation is selected
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Mobile Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center space-x-4">
          <button
            onClick={() => setCurrentChat(null)}
            className="p-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <img
              src={currentChat.participant.avatar}
              alt={currentChat.participant.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {onlineUsers.has(currentChat.participant.id) && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{currentChat.participant.name}</h3>
            <p className="text-sm text-gray-600">
              {onlineUsers.has(currentChat.participant.id) ? 'Online' : `Last seen ${formatTime(currentChat.participant.lastSeen)}`}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <div className="container-responsive">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversations Sidebar */}
            <div className={`${isMobile ? 'w-full' : 'w-1/3'} border-r border-gray-200 flex flex-col ${currentChat && isMobile ? 'hidden' : ''}`}>
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {conversations
                  .filter(conv => 
                    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((conversation) => (
                    <ConversationItem key={conversation.id} conversation={conversation} />
                  ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col ${!currentChat && isMobile ? 'hidden' : ''}`}>
              {currentChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={currentChat.participant.avatar}
                          alt={currentChat.participant.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {onlineUsers.has(currentChat.participant.id) && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900">{currentChat.participant.name}</h3>
                        <p className="text-sm text-gray-600">
                          {onlineUsers.has(currentChat.participant.id) ? (
                            <span className="text-green-600">Online</span>
                          ) : (
                            `Last seen ${formatTime(currentChat.participant.lastSeen)}`
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                        <Video className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setShowChatInfo(!showChatInfo)}
                          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {showChatInfo && (
                          <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 w-48">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                              <Archive className="w-4 h-4" />
                              <span>Archive Chat</span>
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                              <Flag className="w-4 h-4" />
                              <span>Report User</span>
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600">
                              <Block className="w-4 h-4" />
                              <span>Block User</span>
                            </button>
                            <hr className="my-2" />
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600">
                              <Trash2 className="w-4 h-4" />
                              <span>Delete Chat</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    {isTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-gray-100 rounded-2xl px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-end space-x-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                      >
                        <Image className="w-5 h-5" />
                      </button>
                      
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                        >
                          <Smile className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,application/pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <MessageCircle className="w-16 h-16 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                  <p className="text-center">Choose a conversation from the sidebar to start chatting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
