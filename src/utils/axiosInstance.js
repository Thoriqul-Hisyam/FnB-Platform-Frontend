import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',  // Ganti dengan URL backend kamu
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Menambahkan token JWT ke header
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
