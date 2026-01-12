import axios from 'axios';

// Base URL for your API
const BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging (remove in production)
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
    
    return config;
  },
  (error) => {
    console.error(' Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful response (remove in production)
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      console.error('❌ API Error Response:', {
        status,
        message: data?.message || 'Unknown error',
        url: error.config?.url,
      });
      
      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to home
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
          break;
          
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
          
        case 404:
          // Not found
          console.error('Resource not found');
          break;
          
        case 500:
          // Server error
          console.error('Internal server error');
          break;
          
        default:
          console.error(`HTTP Error: ${status}`);
      }
      
      // Return formatted error
      return Promise.reject({
        status,
        message: data?.message || 'Something went wrong',
        errors: data?.errors || [],
      });
      
    } else if (error.request) {
      // Network error - no response received
      console.error('❌ Network Error:', error.message);
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        errors: [],
      });
      
    } else {
      // Something else happened
      console.error('❌ Unknown Error:', error.message);
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred',
        errors: [],
      });
    }
  }
);



// Helper functions for different HTTP methods
export const api = {
  // GET request
  get: (url, config = {}) => axiosInstance.get(url, config),
  
  // POST request
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  
  // PUT request
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  
  // DELETE request
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  
  // PATCH request
  patch: (url, data = {}, config = {}) => axiosInstance.patch(url, data, config),
};

// Auth specific API calls
export const authAPI = {
  // Register user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Get user profile
  getProfile: () => api.get('/auth/profile'),
  
  // Update user profile
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Resume specific API calls
export const resumeAPI = {
  // Create new resume
  create: (resumeData) => api.post('/resume', resumeData),
  
  // Get all user resumes
  getAll: () => api.get('/resume'),
  
  // Get resume by ID
  getById: (id) => api.get(`/resume/${id}`),
  
  // Update resume
  update: (id, resumeData) => api.put(`/resume/${id}`, resumeData),
  
  // Delete resume
  delete: (id) => api.delete(`/resume/${id}`),
  
  // Duplicate resume
  duplicate: (id) => api.post(`/resume/${id}/duplicate`),
  
  // Upload images
  uploadImages: (id, formData) => 
    api.put(`/resume/${id}/upload-images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

// Utility functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Export the main instance as default
export default axiosInstance;