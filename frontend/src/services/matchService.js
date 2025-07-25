import api from './api';

export const matchService = {
  // Get suggested matches
  getMatches: async (page = 1, limit = 12) => {
    const response = await api.get(`/matches/find?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Send interest request
  sendInterest: async (receiverId, message = '') => {
    const response = await api.post('/matches/interest', {
      receiverId,
      message
    });
    return response.data;
  },

  // Respond to interest request
  respondToInterest: async (requestId, status) => {
    const response = await api.put(`/matches/interest/${requestId}`, {
      status
    });
    return response.data;
  },

  // Get user's matches
  getUserMatches: async (page = 1, limit = 12) => {
    const response = await api.get(`/matches?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get interest requests
  getInterestRequests: async (type = 'received', page = 1, limit = 12) => {
    const response = await api.get(`/matches/interests?type=${type}&page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get match recommendations
  getRecommendations: async (count = 10) => {
    const response = await api.get(`/matches/recommendations?count=${count}`);
    return response.data;
  },

  // Save search filters
  saveSearchFilters: async (filters, name) => {
    const response = await api.post('/matches/saved-searches', {
      filters,
      name
    });
    return response.data;
  },

  // Get saved searches
  getSavedSearches: async () => {
    const response = await api.get('/matches/saved-searches');
    return response.data;
  }
};
