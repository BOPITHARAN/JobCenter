import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_DB_HOST ||
  "https://jpbcenterback-production.up.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;