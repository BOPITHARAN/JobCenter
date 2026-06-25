import axios from "axios";

// 🌐 API BASE URL (ENV + FALLBACK SAFETY)
const API_BASE_URL =
  import.meta.env.VITE_DB_HOST ||
  "https://jpbcenterback-production.up.railway.app";

console.log("🔥 API BASE URL:", API_BASE_URL);

// 🧠 Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ⚡ RESPONSE INTERCEPTOR (DEBUG + ERROR HANDLING)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      "❌ API ERROR:",
      error.response?.data || error.message || error
    );
    return Promise.reject(error);
  }
);

export default api;