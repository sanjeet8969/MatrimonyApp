import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // FIXED: Changed from 'token' to 'auth_token'
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // FIXED: Remove the correct token key
          localStorage.removeItem('auth_token');
          // Check if we're not already on login page to avoid infinite redirects
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
          }
          break;
        case 403:
          toast.error('You do not have permission to access this resource.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 422:
          // Handle validation errors
          if (data.errors) {
            Object.values(data.errors).forEach(error => {
              toast.error(error);
            });
          } else {
            toast.error(data.message || 'Validation error.');
          }
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(data.message || 'An error occurred.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
