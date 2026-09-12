import Link from "next/link";
import {
  BriefcaseBusiness,
  FileText,
  Handshake,
  HelpCircle,
  Inbox,
  MessageSquare,
  Package,
  Wrench,
} from "lucide-react";

import { products } from "@/data/products";
import { serviceDetails } from "@/data/services/serviceDetails";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { jobs } from "@/data/jobs";
import { blogs } from "@/data/blogs";
import { companies } from "@/data/companies";

import { Card, CardContent } from "@/components/ui/card";

const overviewItems = [
  {
    title: "Products",
    count: products.length,
    href: "/admin/products",
    icon: Package,
    color: "#0EA5E9",
  },
  {
    title: "Services",
    count: serviceDetails.length,
    href: "/admin/services",
    icon: Wrench,
    color: "#A855F7",
  },
  {
    title: "Testimonials",
    count: testimonials.length,
    href: "/admin/testimonials",
    icon: MessageSquare,
    color: "#F59E0B",
  },
  {
    title: "FAQs",
    count: faqs.length,
    href: "/admin/faqs",
    icon: HelpCircle,
    color: "#10B981",
  },
  {
    title: "Careers",
    count: jobs.length,
    href: "/admin/careers",
    icon: BriefcaseBusiness,
    color: "#3B82F6",
  },
  {
    title: "Blog Posts",
    count: blogs.length,
    href: "/admin/blog",
    icon: FileText,
    color: "#EC4899",
  },
  {
    title: "Collaborations",
    count: companies.length,
    href: "/admin/collaborations",
    icon: Handshake,
    color: "#14B8A6",
  },
];

const quickActions = [
  {
    title: "Add Product",
    href: "/admin/products/new",
  },
  {
    title: "Add Service",
    href: "/admin/services/new",
  },
  {
    title: "Add Blog Post",
    href: "/admin/blog/new",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Welcome back, Admin
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Here&apos;s an overview of your website.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {overviewItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <Card
                className="
                  h-full
                  border
                  border-[#DADEE7]
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
                style={{
                  borderTopColor: item.color,
                  borderTopWidth: "3px",
                }}
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm text-[#676F7E]">
                      {item.title}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#0F1729]">
                      {item.count}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[#0F1729]">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Quickly add or manage website content.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={`
                inline-flex
                items-center
                justify-center
                rounded-md
                px-4
                py-3
                text-sm
                font-medium
                transition-colors
                ${
                  index === 0
                    ? "bg-[#072069] text-white hover:bg-[#072069]/90"
                    : "border border-[#DADEE7] bg-white text-[#0F1729] hover:bg-[#F8FAFC]"
                }
              `}
            >
              {action.title}
            </Link>
          ))}

          {/* Submissions */}
          <Link
            href="/admin/submissions"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-md
              border
              border-[#DADEE7]
              bg-white
              px-4
              py-3
              text-sm
              font-medium
              text-[#0F1729]
              transition-colors
              hover:bg-[#F8FAFC]
            "
          >
            <Inbox className="size-4 text-[#0EA5E9]" />
            View Submissions
          </Link>
        </div>
      </div>
    </div>
  );
}