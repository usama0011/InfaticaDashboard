// src/api.js
import axios from "axios";
//https://infatica-dashboard-backend.vercel.app/api/stats
//http://localhost:5000/api/stats
const API = axios.create({
  baseURL: "https://infatica-dashboard-backend.vercel.app/api/stats",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
