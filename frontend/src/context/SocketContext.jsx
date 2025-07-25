import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { socketService } from '../services/socketService';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    if (isAuthenticated && user) {
      // Connect to socket
      socketService.connect(localStorage.getItem('auth_token'));
      
      // Join user room
      socketService.joinUserRoom(user.id);

      // Listen for connection events
      socketService.on('connect', () => {
        setIsConnected(true);
      });

      socketService.on('disconnect', () => {
        setIsConnected(false);
      });

      // Listen for online users
      socketService.on('users_online', (users) => {
        setOnlineUsers(new Set(users));
      });

      socketService.on('user_online', (userId) => {
        setOnlineUsers(prev => new Set([...prev, userId]));
      });

      socketService.on('user_offline', (userId) => {
        setOnlineUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      });

      return () => {
        socketService.disconnect();
        setIsConnected(false);
        setOnlineUsers(new Set());
      };
    }
  }, [isAuthenticated, user]);

  // Socket event handlers
  const joinConversation = (conversationId) => {
    socketService.joinConversation(conversationId);
  };

  const leaveConversation = (conversationId) => {
    socketService.leaveConversation(conversationId);
  };

  const sendMessage = (messageData) => {
    socketService.sendMessage(messageData);
  };

  const sendTyping = (conversationId) => {
    socketService.sendTyping(conversationId);
  };

  const sendStopTyping = (conversationId) => {
    socketService.sendStopTyping(conversationId);
  };

  // Event listeners
  const onNewMessage = (callback) => {
    socketService.onNewMessage(callback);
    return () => socketService.off('new_message', callback);
  };

  const onTyping = (callback) => {
    socketService.onTyping(callback);
    return () => socketService.off('typing', callback);
  };

  const onStopTyping = (callback) => {
    socketService.onStopTyping(callback);
    return () => socketService.off('stop_typing', callback);
  };

  const onNotification = (callback) => {
    socketService.onNotification(callback);
    return () => socketService.off('notification', callback);
  };

  const value = {
    isConnected,
    onlineUsers,
    joinConversation,
    leaveConversation,
    sendMessage,
    sendTyping,
    sendStopTyping,
    onNewMessage,
    onTyping,
    onStopTyping,
    onNotification
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
