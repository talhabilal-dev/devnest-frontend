"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfilePictureUpload from "@/components/profile-picture-upload";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  useEffect(() => {
    if (!username) {
      setIsUsernameAvailable(null);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        setCheckingUsername(true);
        const res = await api.post(`/auth/check-username/${username}`);

        setIsUsernameAvailable(res.data.data.available);
      } catch (error) {
        console.error(error);
        setIsUsernameAvailable(false);
      } finally {
        setCheckingUsername(false);
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUsernameAvailable === false) {
      toast.error("Username is already taken.");
      return;
    }
    

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      formData.append("profilePicture", profilePicture || "");

      console.log(formData);
      const res = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Account created successfully!");
      router.push("/signin");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="font-bold text-white">B</span>
              </div>
              <span className="font-bold text-xl">DevNest</span>
            </div>
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="text-gray-400 mt-2">
              Join our community of writers and readers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="mx-auto w-32">
                <ProfilePictureUpload
                  value={profilePicture}
                  onChange={setProfilePicture}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="bg-gray-900 border-gray-800 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-900 border-gray-800 focus:border-purple-500"
                />
                {username && (
                  <p className="text-xs mt-1">
                    {checkingUsername ? (
                      <span className="text-gray-400">
                        Checking availability...
                      </span>
                    ) : isUsernameAvailable ? (
                      <span className="text-green-400">
                        Username is available!
                      </span>
                    ) : (
                      <span className="text-red-400">
                        Username is already taken.
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="bg-gray-900 border-gray-800 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-gray-900 border-gray-800 focus:border-purple-500"
                />
                <p className="text-xs text-gray-400">
                  Must be at least 8 characters long
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-purple-400 hover:text-purple-300"
              >
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
