"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f1218] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full bg-purple-700" />
        <Skeleton className="h-7 w-28 bg-gray-700" />
      </header>

      {/* Profile Card */}
      <div className="mx-4 mt-4 bg-[#1a1f2a] rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 bg-gray-700" />
            <Skeleton className="h-4 w-48 bg-gray-700" />
          </div>
        </div>
      </div>

      {/* New Post Button */}
      <div className="mx-4 mt-4">
        <Skeleton className="h-12 w-full rounded-lg bg-purple-800" />
      </div>

      {/* Divider */}
      <div className="mx-4 my-4">
        <Skeleton className="h-px w-full bg-gray-800" />
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 flex flex-col gap-4">
        {/* Home */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 bg-gray-700" />
          <Skeleton className="h-5 w-20 bg-gray-700" />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 bg-gray-700" />
          <Skeleton className="h-5 w-20 bg-gray-700" />
        </div>

        {/* Posts - Active */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/50">
          <Skeleton className="h-6 w-6 bg-purple-700" />
          <Skeleton className="h-5 w-20 bg-purple-700" />
        </div>

        {/* Comments */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 bg-gray-700" />
          <Skeleton className="h-5 w-28 bg-gray-700" />
        </div>

        {/* Settings */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 bg-gray-700" />
          <Skeleton className="h-5 w-24 bg-gray-700" />
        </div>
      </nav>

      {/* Sign Out - at bottom */}
      <div className="mt-auto px-4 mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 bg-gray-700" />
          <Skeleton className="h-5 w-24 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
