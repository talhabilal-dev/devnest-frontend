// /lib/axios.js

import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Optional: Response interceptor (handle 401s etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error.response.data);
      toast.error("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default api;
