"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/header";
import { RecentPosts } from "@/components/dashboard/recent-posts";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentComments } from "@/components/dashboard/recent-comments";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Dashboard"
        text="Welcome back! Here's an overview of your blog activity."
      />

      <StatsCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription className="text-gray-400">
              Your recently published and drafted posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPosts />
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Recent Comments</CardTitle>
            <CardDescription className="text-gray-400">
              Latest comments on your posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentComments />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
