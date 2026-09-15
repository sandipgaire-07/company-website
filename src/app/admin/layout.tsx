"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return children;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />

      <main className="min-h-screen flex-1">
        <AdminHeader />

        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  );
}