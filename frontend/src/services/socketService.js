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

    // ✅ Corrected: Using VITE_SOCKET_URL instead of VITE_API_URL
    this.socket = io(import.meta.env.VITE_SOCKET_URL, {
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

  joinUserRoom(userId) {
    if (this.socket) {
      this.socket.emit('join_user_room', userId);
    }
  }

  joinConversation(conversationId) {
    if (this.socket) {
      this.socket.emit('join_conversation', conversationId);
    }
  }

  leaveConversation(conversationId) {
    if (this.socket) {
      this.socket.emit('leave_conversation', conversationId);
    }
  }

  sendMessage(messageData) {
    if (this.socket) {
      this.socket.emit('send_message', messageData);
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onMessageStatusUpdate(callback) {
    if (this.socket) {
      this.socket.on('message_status_update', callback);
    }
  }

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

  onNotification(callback) {
    if (this.socket) {
      this.socket.on('notification', callback);
    }
  }

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

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      socketId: this.socket?.id
    };
  }
}

export const socketService = new SocketService();
