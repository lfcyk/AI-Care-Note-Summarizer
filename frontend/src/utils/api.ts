import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://cuddly-palm-tree-6pr5ppw4r73rrgj-8000.app.github.dev/api",
  withCredentials: true,
});

export default api;
