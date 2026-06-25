import axios from "axios";

// 🌐 GET RAW URL (ENV + FALLBACK)
const RAW_URL =
  import.meta.env.VITE_DB_HOST ||
  "https://jpbcenterback-production.up.railway.app";

// 🧹 SANITIZE URL (Netlify-ல் இருந்து வரும் தேவையில்லாத "" கொட்டேஷன்களை நீக்குகிறது)
const API_BASE_URL = RAW_URL.replace(/['"]/g, "");

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