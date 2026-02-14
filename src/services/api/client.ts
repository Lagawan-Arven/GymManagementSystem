import axios from "axios";

const API_BASE_URL = import.meta.env.BACKEND_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

{
  /* ATTACH JWT AUTOMATICALLY */
}
apiClient.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    console.log("[API] Attaching token to request");
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

{
  /* GLOBAL ERROR HANDLING */
}
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("[API ERROR]", error.response?.data);

    if (error.response?.status === 401) {
      console.warn("[API] Unauthorized, Logging out...");
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);
