import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect(token) {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(import.meta.env.VITE_API_URL, {
      auth: {
        token
      },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Join user to their personal room
  joinUserRoom(userId) {
    if (this.socket) {
      this.socket.emit('join_user_room', userId);
    }
  }

  // Join conversation room
  joinConversation(conversationId) {
    if (this.socket) {
      this.socket.emit('join_conversation', conversationId);
    }
  }

  // Leave conversation room
  leaveConversation(conversationId) {
    if (this.socket) {
      this.socket.emit('leave_conversation', conversationId);
    }
  }

  // Send message
  sendMessage(messageData) {
    if (this.socket) {
      this.socket.emit('send_message', messageData);
    }
  }

  // Listen for new messages
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  // Listen for message status updates
  onMessageStatusUpdate(callback) {
    if (this.socket) {
      this.socket.on('message_status_update', callback);
    }
  }

  // Listen for typing indicators
  onTyping(callback) {
    if (this.socket) {
      this.socket.on('typing', callback);
    }
  }

  onStopTyping(callback) {
    if (this.socket) {
      this.socket.on('stop_typing', callback);
    }
  }

  // Send typing indicator
  sendTyping(conversationId) {
    if (this.socket) {
      this.socket.emit('typing', conversationId);
    }
  }

  sendStopTyping(conversationId) {
    if (this.socket) {
      this.socket.emit('stop_typing', conversationId);
    }
  }

  // Listen for user online status
  onUserOnline(callback) {
    if (this.socket) {
      this.socket.on('user_online', callback);
    }
  }

  onUserOffline(callback) {
    if (this.socket) {
      this.socket.on('user_offline', callback);
    }
  }

  // Listen for notifications
  onNotification(callback) {
    if (this.socket) {
      this.socket.on('notification', callback);
    }
  }

  // Listen for interest requests
  onInterestRequest(callback) {
    if (this.socket) {
      this.socket.on('interest_request', callback);
    }
  }

  onInterestResponse(callback) {
    if (this.socket) {
      this.socket.on('interest_response', callback);
    }
  }

  // Generic event listeners
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      socketId: this.socket?.id
    };
  }
}

export const socketService = new SocketService();
