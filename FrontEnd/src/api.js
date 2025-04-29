// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://infatica-dashboard-backend.vercel.app/api/stats",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
