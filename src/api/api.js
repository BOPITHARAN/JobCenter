import axios from "axios";

// URL-ஐச் சரியாகக் கையாளுதல்
const BASE_URL = import.meta.env.VITE_DB_HOST || "https://jpbcenterback-production.up.railway.app";
const API_BASE_URL = BASE_URL.replace(/['"]/g, "");

console.log("🔥 API BASE URL Configured:", API_BASE_URL);

// 🧠 Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // ⚠️ IMPORTANT: Remove "Content-Type" here.
  // Axios will auto-detect "multipart/form-data" for Files 
  // and "application/json" for standard requests.
});

// ⚡ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ API ERROR (Server Response):", error.response.data);
      // Optional: Handle 401 Unauthorized globally
      if (error.response.status === 401) {
        console.log("Session expired, redirecting to login...");
      }
    } else if (error.request) {
      console.error("❌ API ERROR (No Response):", error.request);
    } else {
      console.error("❌ API ERROR (Request Setup):", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;