import axios from "axios";

// 🌐 URL-ஐச் சரியாக மாற்றியுள்ளேன் (jpb -> job)
const BASE_URL = 
  import.meta.env.VITE_DB_HOST || 
  "https://jpbcenterback-production.up.railway.app";

// 🧹 URL-ல் தேவையில்லாத ' அல்லது " இருந்தால் நீக்குகிறது
const API_BASE_URL = BASE_URL.replace(/['"]/g, "");

console.log("🔥 API BASE URL:", API_BASE_URL);

// 🧠 Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Cookies/Session அனுப்ப இது முக்கியம்
  headers: {
    "Content-Type": "application/json",
  },
});

// ⚡ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // ❌ Error Handling - எங்கு பிழை என்று துல்லியமாகக் காட்டும்
    if (error.response) {
      console.error("❌ API ERROR (Server Response):", error.response.data);
    } else if (error.request) {
      console.error("❌ API ERROR (No Response):", error.request);
    } else {
      console.error("❌ API ERROR (Request Setup):", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;