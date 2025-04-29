"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/axios";
import { toast } from "sonner";
export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  console.log("Token:", token);

  const [verificationState, setVerificationState] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyEmailToken = async () => {
      if (!token) {
        setVerificationState("error");
        setErrorMessage(
          "No verification token provided. Please check your email link."
        );
        return;
      }

      try {
        const response = await api.post(`/auth/verify-email/${token}`);
        console.log("Response:", response.data);

        if (response.data.success) {
          toast.success("Email verified successfully!");

          setVerificationState("success");
        } else {
          toast.error("Email verification failed. Please try again.");
          setVerificationState("error");
          setErrorMessage(
            "Invalid or expired verification token. Please request a new verification email."
          );
        }
      } catch (error) {
        setVerificationState("error");
        setErrorMessage(
          "An error occurred while verifying your email. Please try again later."
        );
      }
    };

    verifyEmailToken();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="font-bold text-white">B</span>
                </div>
                <span className="font-bold text-xl text-zinc-100">DevNest</span>
              </div>
              <CardTitle className="text-2xl text-purple-600">
                Email Verification
              </CardTitle>
              <CardDescription className="text-gray-200">
                {verificationState === "loading"
                  ? "Verifying your email address..."
                  : verificationState === "success"
                  ? "Your email has been verified successfully!"
                  : "Email verification failed"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                {verificationState === "loading" && (
                  <Loader2 className="h-16 w-16 text-purple-600 animate-spin" />
                )}

                {verificationState === "success" && (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                )}

                {verificationState === "error" && (
                  <XCircle className="h-16 w-16 text-red-500" />
                )}

                <p className="mt-4 text-center text-zinc-400">
                  {verificationState === "loading" &&
                    "Please wait while we verify your email address..."}

                  {verificationState === "success" &&
                    "Thank you for verifying your email address. You can now sign in to your account."}

                  {verificationState === "error" && errorMessage}
                </p>
              </div>

              {verificationState !== "loading" && (
                <Button
                  className={`w-full ${
                    verificationState === "success"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => router.push("/signin")}
                >
                  Go to Sign In
                </Button>
              )}

              {verificationState === "error" && (
                <div className="text-center">
                  <Link
                    href="/"
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Return to homepage
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
