// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Your Spring Boot backend
});

// Automatically attach the JWT token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
console.log("Token in localStorage:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
