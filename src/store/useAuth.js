import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, // 👈 by default, no user
  accessToken: null, // 👈 optional, if you want to store token too

  // ✅ Function to set user (after login)
  setUser: (userData) =>
    set(() => ({
      user: userData,
    })),

  // ✅ Function to remove user (after logout)
  logout: () =>
    set(() => ({
      user: null,
      accessToken: null,
    })),

  // ✅ Optional: if you want to store access token too
  setAccessToken: (token) =>
    set(() => ({
      accessToken: token,
    })),
}));
