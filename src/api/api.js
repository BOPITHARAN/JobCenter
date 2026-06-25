import axios from "axios";

// 🌐 API BASE URL (ENV + FALLBACK SAFETY)
const API_BASE_URL =
  import.meta.env.VITE_DB_HOST ||
  "https://jpbcenterback-production.up.railway.app";

// 🔍 DEBUG LOGS
console.log("🔥 API BASE URL:", API_BASE_URL);
console.log("🔥 VITE_DB_HOST:", import.meta.env.VITE_DB_HOST);
console.log("🔥 ALL ENV:", import.meta.env);

// 🧠 Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 📡 Request Debug
api.interceptors.request.use(
  (config) => {
    console.log(
      `📡 API REQUEST: ${config.method?.toUpperCase()} ${
        config.baseURL
      }${config.url}`
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚡ Response Debug
api.interceptors.response.use(
  (response) => {
    console.log("✅ API RESPONSE:", response.data);
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