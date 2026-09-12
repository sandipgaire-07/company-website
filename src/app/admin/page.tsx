import {
  Package,
  Wrench,
  MessageSquare,
  BriefcaseBusiness,
  FileText,
  Inbox,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    title: "Products",
    description: "Manage your product catalog, pricing, and features",
    href: "/admin/products",
    icon: Package,
    color: "from-[#072069] to-[#0EA5E9]",
  },
  {
    title: "Services",
    description: "Update services offered by your company",
    href: "/admin/services",
    icon: Wrench,
    color: "from-[#0EA5E9] to-[#06b6d4]",
  },
  {
    title: "Testimonials",
    description: "Review and manage customer testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
    color: "from-[#7c3aed] to-[#a78bfa]",
  },
  {
    title: "Careers",
    description: "Post and manage job openings",
    href: "/admin/careers",
    icon: BriefcaseBusiness,
    color: "from-[#059669] to-[#34d399]",
  },
  {
    title: "Blog",
    description: "Write and manage blog posts",
    href: "/admin/blog",
    icon: FileText,
    color: "from-[#dc2626] to-[#f87171]",
  },
  {
    title: "Submissions",
    description: "View contact and demo request submissions",
    href: "/admin/submissions",
    icon: Inbox,
    color: "from-[#d97706] to-[#fbbf24]",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-[#072069] to-[#0EA5E9] p-6 text-white shadow-lg">
        <p className="text-sm font-medium text-blue-200">Welcome back</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-blue-100">
          Manage your website content, products, services, and more from here.
        </p>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#0F1729]">
          Quick Access
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col gap-4 rounded-2xl border border-[#DADEE7] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow`}
                >
                  <Icon className="size-5" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F1729]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#676F7E]">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-medium text-[#0EA5E9] transition-all group-hover:gap-2">
                  <span>Go to {item.title}</span>
                  <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}