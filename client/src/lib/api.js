import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: (
    import.meta.env.VITE_API_BASE_URL
    || import.meta.env.VITE_API_URL
    || ''
  ).replace(/\/$/, ''),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');
    
    if (user) {
      const userData = JSON.parse(user);
      config.headers.Authorization = `Bearer ${userData.token}`;
    } else if (admin) {
      const adminData = JSON.parse(admin);
      config.headers.Authorization = `Bearer ${adminData.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL
  || import.meta.env.VITE_API_URL
  || ''
).replace(/\/$/, '');
