// /lib/axios.js

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 🔥 THIS is important for sending cookies
});

// Optional: Response interceptor (handle 401s etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login page)
      toast.error("Session expired. Please log in again.");
      const router = useRouter();
      router.push("/signin");
    }
    return Promise.reject(error);
  }
);

export default api;
