import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for HttpOnly cookies
});

// Interceptor to attach access token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 and refresh token
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token. 
        // The refresh token is in the HttpOnly cookie, so we just call the endpoint.
        const res = await axios.post(
          `${API_URL}/auth/token/refresh/`,
          {},
          { withCredentials: true }
        );
        const { access } = res.data;
        localStorage.setItem('access_token', access);
        client.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return client(originalRequest);
      } catch (err) {
        // Refresh failed, clear session
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default client;
