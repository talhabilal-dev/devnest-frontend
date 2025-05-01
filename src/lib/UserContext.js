"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

// Set default context value to prevent undefined crashes
const defaultContext = {
  user: null,
  loading: true,
};

const UserContext = createContext(defaultContext);

export const useUser = () => {
  const context = useContext(UserContext);
  // If someone uses useUser outside of provider, show warning
  if (!context) {
    if (typeof window !== "undefined") {
      console.warn("useUser() called outside of UserProvider.");
    }
    return defaultContext;
  }
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/profile");
        console.log("User data:", res.data.data);
        setUser(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
