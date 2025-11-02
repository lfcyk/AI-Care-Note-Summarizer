import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  // withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use((config) => {
  console.log('Request:', {
    method: config.method,
    url: config.url,
    data: config.data,
    headers: config.headers
  });
  return config;
});

// Add response interceptor
api.interceptors.response.use((response) => {
  console.log('Response:', {
    status: response.status,
    data: response.data
  });
  return response;
}, (error) => {
  console.error('Response Error:', error);
  return Promise.reject(error);
});

export default api;
