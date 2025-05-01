// src/api.js
import axios from "axios";
//http://localhost:5000/api/stats
//https://infatica-dashboard-backend.vercel.app/api/stats
const API = axios.create({
  baseURL: "https://infatica-dashboard-backend.vercel.app/api/stats",
});

// Automatically add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
