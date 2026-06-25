import axios from 'axios';

const api = axios.create({
    // VITE_API_URL இல்லையென்றால், நேரடி Railway URL-ஐப் பயன்படுத்தவும்
    baseURL: import.meta.env.VITE_API_URL || 'https://jobcenterback-production.up.railway.app', 
    withCredentials: true 
});

export default api;