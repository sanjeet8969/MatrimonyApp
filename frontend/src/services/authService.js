import api from './api';

export const authService = {
  // Register user
  register: async (email, password) => {
    return await api.post('/auth/register', { email, password });
  },

  // Login user
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },

  // Get current user
  getMe: async () => {
    return await api.get('/auth/me');
  },

  // Logout user
  logout: async () => {
    return await api.post('/auth/logout');
  }
};
