import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Toaster } from "sonner";
import { UserProvider } from "@/lib/UserContext";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-950 p-4 md:p-6">
          <UserProvider>{children}</UserProvider>

          <Toaster />
        </main>
      </div>
    </div>
  );
}
