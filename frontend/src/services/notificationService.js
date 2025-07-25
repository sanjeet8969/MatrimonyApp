import api from './api';

class NotificationService {
  constructor() {
    this.socket = null;
    this.subscribers = new Set();
  }

  // Get all notifications
  async getAll(page = 1, limit = 20) {
    const response = await api.get(`/notifications?page=${page}&limit=${limit}`);
    return response.data;
  }

  // Mark notification as read
  async markAsRead(id) {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  }

  // Mark all notifications as read
  async markAllAsRead() {
    const response = await api.put('/notifications/read-all');
    return response.data;
  }

  // Delete notification
  async delete(id) {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  }

  // Get unread count
  async getUnreadCount() {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  }

  // Subscribe to real-time notifications
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify all subscribers
  notifySubscribers(notification) {
    this.subscribers.forEach(callback => callback(notification));
  }

  // Connect to WebSocket for real-time notifications
  connect(token) {
    if (typeof window !== 'undefined' && window.io) {
      this.socket = window.io(process.env.VITE_API_URL, {
        auth: { token }
      });

      this.socket.on('notification', (notification) => {
        this.notifySubscribers(notification);
      });
    }
  }

  // Disconnect from WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const notificationService = new NotificationService();
