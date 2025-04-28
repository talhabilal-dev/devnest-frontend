"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Settings,
  LogOut,
  FileText,
  MessageSquare,
  Menu,
  X,
  PenSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import api from "@/lib/axios";
export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    // Handle sign out logic here

    const response = await api.post("/auth/logout", {}); // Adjust the endpoint as needed
    // Assuming your API returns a JSON response

    const data = response.data;

    if (data.success) {
      toast.success("Successfully signed out");
      closeSidebar();
      router.push("/signin");
    } else {
      // Handle error case
      toast.error("Failed to sign out");
      console.error("Failed to sign out");
    }
  };

  const navItems = [
    {
      title: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Posts",
      href: "/dashboard/posts",
      icon: FileText,
    },
    {
      title: "Comments",
      href: "/dashboard/comments",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto border-r border-gray-800 bg-gray-900 p-4 transition-all duration-200 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        initial={false}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-6">
            {/* Logo and brand */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2"
              onClick={closeSidebar}
            >
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="font-bold text-white">B</span>
              </div>
              <span className="font-bold text-xl">BlogSpace</span>
            </Link>

            {/* User profile */}
            <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950/50 p-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-gray-400">john@example.com</span>
              </div>
            </div>

            {/* Create new post button */}
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              asChild
            >
              <Link href="/dashboard/posts/new" onClick={closeSidebar}>
                <PenSquare className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>

            <Separator className="bg-gray-800" />

            {/* Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    pathname === item.href
                      ? "bg-purple-600/20 text-purple-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Sign out button */}
          <Button
            variant="ghost"
            className="mt-6 w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={() => {
              handleSignOut();
              closeSidebar();
            }}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </motion.aside>
    </>
  );
}
