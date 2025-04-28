"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";

export default function useAuthRedirect() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    console.log("User in useAuthRedirect:", user); // Debugging line
    if (!user) {
      router.replace("/signin");
    }
  }, [user, router]);
}
