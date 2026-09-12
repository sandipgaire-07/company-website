import Link from "next/link";
import {
  BriefcaseBusiness,
  FileText,
  HelpCircle,
  MessageSquare,
  Package,
  Handshake,
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
  },
  {
    title: "Services",
    count: serviceDetails.length,
    href: "/admin/services",
    icon: Wrench,
  },
  {
    title: "Testimonials",
    count: testimonials.length,
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    title: "FAQs",
    count: faqs.length,
    href: "/admin/faqs",
    icon: HelpCircle,
  },
  {
    title: "Careers",
    count: jobs.length,
    href: "/admin/careers",
    icon: BriefcaseBusiness,
  },
  {
    title: "Blog Posts",
    count: blogs.length,
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Collaborations",
    count: companies.length,
    href: "/admin/collaborations",
    icon: Handshake,
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Welcome back, Admin
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Here&apos;s an overview of your website.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {overviewItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <Card
                className="
                  h-full
                  border-[#DADEE7]
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-[#0EA5E9]/40
                  hover:shadow-md
                "
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#EBF0FA] text-[#072069]">
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

      <div className="space-y-4">
  <div>
    <h2 className="text-lg font-semibold text-[#0F1729]">
      Quick Actions
    </h2>

    <p className="mt-1 text-sm text-[#676F7E]">
      Quickly add or manage website content.
    </p>
  </div>

  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Link
      href="/admin/products/new"
      className="
        inline-flex
        items-center
        justify-center
        rounded-md
        bg-[#072069]
        px-4
        py-3
        text-sm
        font-medium
        text-white
        transition-colors
        hover:bg-[#072069]/90
      "
    >
      Add Product
    </Link>

    <Link
      href="/admin/services/new"
      className="
        inline-flex
        items-center
        justify-center
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
      Add Service
    </Link>

    <Link
      href="/admin/blog/new"
      className="
        inline-flex
        items-center
        justify-center
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
      Add Blog Post
    </Link>
  </div>
</div>
    </div>
    
  );
}