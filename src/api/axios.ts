import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust to your backend's base URL
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