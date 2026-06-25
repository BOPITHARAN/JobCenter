import axios from 'axios';

// 🌐 1. URL-ஐ எடுக்கிறோம் (ENV அல்லது Fallback)
const RAW_URL = import.meta.env.VITE_API_URL || 'https://jpbcenterback-production.up.railway.app';

// 🧹 2. தேவையில்லாத கொட்டேஷன்களை (Quotes) நீக்குகிறோம்
const CLEAN_URL = RAW_URL.replace(/['"]/g, "");

const api = axios.create({
    // 🚀 3. சுத்தமான URL-ஐப் பயன்படுத்துகிறோம்
    baseURL: CLEAN_URL, 
    withCredentials: true 
});

export default api;