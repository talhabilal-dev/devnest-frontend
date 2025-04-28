import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, //
  accessToken: null,

  // ✅ Function to set user (after login)
  setUser: (userData) =>
    set(() => ({
      user: userData,
    })),

  // ✅ Optional: if you want to store access token too
  setAccessToken: (token) =>
    set(() => ({
      accessToken: token,
    })),
}));
