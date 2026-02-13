import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.shinningpaint.startechaigroup.com/api';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      // Forbidden
      console.error('Access forbidden');
    }

    if (error.response && error.response.status >= 500) {
      // Server error
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // GET request
  get: <T = any>(url: string, config?: any): Promise<T> => {
    return axiosInstance.get(url, config);
  },

  // POST request
  post: <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    return axiosInstance.post(url, data, config);
  },

  // PUT request
  put: <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    return axiosInstance.put(url, data, config);
  },

  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    return axiosInstance.patch(url, data, config);
  },

  // DELETE request
  delete: <T = any>(url: string, config?: any): Promise<T> => {
    return axiosInstance.delete(url, config);
  },

  // Upload file
  upload: <T = any>(url: string, formData: FormData, config?: any): Promise<T> => {
    return axiosInstance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
  },
};

// Export axios instance for direct use if needed
export { axiosInstance };

// Export API base URL
export { API_BASE_URL };

export default apiService;
