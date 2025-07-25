import api from './api';

export const profileService = {
  // Get current user's profile
  getMyProfile: async () => {
    const response = await api.get('/profiles/me');
    return response.data;
  },

  // Get profile by user ID
  getProfile: async (userId) => {
    const response = await api.get(`/profiles/${userId}`);
    return response.data;
  },

  // Create or update profile
  updateProfile: async (profileData) => {
    const response = await api.put('/profiles', profileData);
    return response.data;
  },

  // Search profiles
  searchProfiles: async (filters, page = 1, limit = 12) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    const response = await api.get(`/profiles/search?${params}`);
    return response.data;
  },

  // Upload profile photo
  uploadPhoto: async (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await api.post('/profiles/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Delete profile photo
  deletePhoto: async (photoId) => {
    const response = await api.delete(`/profiles/photos/${photoId}`);
    return response.data;
  },

  // Get profile views
  getProfileViews: async () => {
    const response = await api.get('/profiles/views');
    return response.data;
  },

  // Get profile completion status
  getProfileCompletion: async () => {
    const response = await api.get('/profiles/completion');
    return response.data;
  }
};
