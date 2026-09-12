"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  FileText,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const contentItems = [
  { title: "Submissions", href: "/admin/submissions", icon: Inbox },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Services", href: "/admin/services", icon: Wrench },
  { title: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { title: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { title: "Careers", href: "/admin/careers", icon: BriefcaseBusiness },
  { title: "Blog", href: "/admin/blog", icon: FileText },
];


export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-[#020e33] text-white">
      <SidebarContent>

        {/* Brand */}
        <div className="px-4 py-5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#072069] to-[#0EA5E9] font-bold text-white">
              L
            </div>

            <div>
              <p className="font-semibold">
                LeafClutch
              </p>
              <p className="">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/admin"}
                  className="
                    hover:bg-[#EBF0FA]
                    hover:text-[#072069]
                    data-active:bg-[#EBF0FA]
                    data-active:text-[#072069]
                  "
                  render={
                    <Link href="/admin">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Content */}
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>

          <SidebarGroupContent >
            <SidebarMenu className="flex gap-3">
              {contentItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.href)}
                      className="
                        hover:bg-[#EBF0FA]
                        hover:text-[#072069]
                        data-active:bg-[#EBF0FA]
                        data-active:text-[#072069]
                      "
                      render={
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname.startsWith("/admin/settings")}
                  className="
                    hover:bg-[#EBF0FA]
                    hover:text-[#072069]
                    data-active:bg-[#EBF0FA]
                    data-active:text-[#072069]
                  "
                  render={
                    <Link href="/admin/settings">
                      <Settings />
                      <span>Company Settings</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}