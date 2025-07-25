import api from './api';

export const messageService = {
  // Get conversations
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  // Get conversation with specific user
  getConversation: async (userId, page = 1, limit = 50) => {
    const response = await api.get(`/messages/${userId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Send message
  sendMessage: async (receiverId, content, messageType = 'text') => {
    const response = await api.post('/messages', {
      receiverId,
      content,
      messageType
    });
    return response.data;
  },

  // Mark messages as read
  markAsRead: async (senderId) => {
    const response = await api.put(`/messages/read/${senderId}`);
    return response.data;
  },

  // Delete message
  deleteMessage: async (messageId) => {
    const response = await api.delete(`/messages/${messageId}`);
    return response.data;
  },

  // Get unread message count
  getUnreadCount: async () => {
    const response = await api.get('/messages/unread-count');
    return response.data;
  },

  // Upload file/image
  uploadFile: async (file, receiverId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('receiverId', receiverId);
    
    const response = await api.post('/uploads/message', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};
