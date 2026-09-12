"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { adminLogout } from "@/actions/auth";

export default function AdminHeader() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      const res = await adminLogout();
      if (res.success) {
        toast.success("Logged out successfully.");
        router.push("/admin/login");
        router.refresh();
      } else {
        toast.error(res.error || "Logout failed.");
      }
    } catch {
      toast.error("An unexpected error occurred during logout.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#DADEE7] bg-white px-4 sm:px-6">
      
      {/* Sidebar toggle */}
      <SidebarTrigger className="text-[#676F7E] hover:bg-[#EBF0FA] hover:text-[#072069]" />

      {/* Right side */}
      <div className="flex items-center gap-2">

        {/* Notifications */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative text-[#676F7E] hover:bg-[#EBF0FA] hover:text-[#072069]"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#0EA5E9] ring-2 ring-white" />
        </Button>

        {/* Admin menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                className="h-10 gap-2 px-2 hover:bg-[#EBF0FA] sm:px-3"
                aria-label="Open admin menu"
              />
            }
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-[#072069] to-[#0EA5E9] text-sm font-semibold text-white">
              A
            </span>

            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium text-[#0F1729]">
                Admin
              </span>
              <span className="block text-xs text-[#676F7E]">
                Administrator
              </span>
            </span>

            <ChevronDown className="size-4 text-[#676F7E]" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 border-[#DADEE7] bg-white"
          >
            <DropdownMenuLabel>Admin account</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User className="text-[#072069]" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="text-[#072069]" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={handleLogout}
              disabled={isLoggingOut}
              className="text-red-600 focus:text-red-600"
            >
              {isLoggingOut ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogOut className="text-red-500" />
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}