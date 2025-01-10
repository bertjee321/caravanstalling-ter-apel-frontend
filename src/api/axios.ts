import axios from "axios";
import { API_URL } from "../app.config";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
});

// Automatically add the token to the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
