import axios from "axios";
import { AUTH_SESSION_KEY } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use((config) => {
  const storedSession = localStorage.getItem(AUTH_SESSION_KEY);
  if (storedSession) {
    const { token } = JSON.parse(storedSession);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;