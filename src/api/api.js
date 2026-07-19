import axios from "axios";

// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://jpbcenterback-production-1b03.up.railway.app";

console.log("🔥 API BASE URL Configured:", API_BASE_URL);

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ API ERROR (Server Response):", error.response.data);

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