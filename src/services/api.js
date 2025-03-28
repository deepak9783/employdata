import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config}, 
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 400) {
      error.message = error.response.data?.error || 'Invalid request format';
    }
    return Promise.reject(error);
  }
);

export const login = (email, password) => {
  return api.post('/login', { 
    email: email.trim(),
    password: password.trim()
  });
};

// ... rest of your API methods ...
// export const login = (email, password) => {
//   return api.post('/login', { email, password });
// };

export const getUsers = (page = 1) => {
  return api.get(`/users?page=${page}`);
};

export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export default api;