"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";

export default function useAuthRedirect({ protectedRoute = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!router || !pathname) return;

    if (protectedRoute && !user) {
      console.log("Protected route, no user -> redirect to signin");
      router.replace("/signin");
    }

    if (!protectedRoute && user) {
      console.log("Guest-only page, but user logged in -> redirect to dashboard");
      router.replace("/dashboard");
    }
  }, [user, router, pathname, protectedRoute]);
}
