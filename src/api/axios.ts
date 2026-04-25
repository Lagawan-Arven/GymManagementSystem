import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REQUEST INTERCEPTOR: Attach JWT
// ==========================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ==========================================
// RESPONSE INTERCEPTOR: Handle 401s
// ==========================================
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, expired, or blacklisted
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("subscription");

      // Prevent infinite redirect loops if they are already on public pages
      const publicPaths = ["/login", "/register", "/"];
      if (!publicPaths.includes(window.location.pathname)) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);
