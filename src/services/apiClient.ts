import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { getToken } from './authService';

// Create config with proper typing
const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  }
};

// Create typed axios instance
const apiClient: AxiosInstance = axios.create(config);



// Add request interceptor with proper typing
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add cache via headers instead of adapter
apiClient.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === 'get') {
    config.headers = {
      ...config.headers,
      'Cache-Control': 'max-age=900' // 15 minutes
    };
  }
  return config;
});

export default apiClient;