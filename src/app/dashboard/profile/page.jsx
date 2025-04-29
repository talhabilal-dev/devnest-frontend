"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarFile(file);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/auth/profile");
        console.log("User data:", response.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>Error loading user data</div>;
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Profile"
        text="Manage your profile information and settings."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className={"text-2xl text-purple-500"}>Profile Information</CardTitle>
            <CardDescription className="text-gray-400">
              Update your personal information and public profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.profilePicture} alt="Profile" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-900 hover:bg-gray-800 hover:text-zinc-100"
                  onClick={handleAvatarChange}
                >
                  Change Avatar
                </Button>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-4 text-zinc-300">
                <div className="grid gap-4 md:grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      defaultValue={userData.name || "N/A"}
                      className="bg-gray-800 border-gray-700 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={userData.email || "N/A"}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    defaultValue={userData.username || "N/A"}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue={userData.bio || "Tell us about yourself..."}
                    className="min-h-[100px] bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription className="text-gray-200">
                Your account activity and statistics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Member Since</span>
                  <span>April 10, 2025</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Total Posts</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Total Comments</span>
                  <span>45</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Total Views</span>
                  <span>2,345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Followers</span>
                  <span>87</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription className="text-gray-400">
                Connect your social media accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="@username"
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/username"
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    placeholder="github.com/username"
                    className="bg-gray-800 border-gray-700 focus:border-purple-500"
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Save Links
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
