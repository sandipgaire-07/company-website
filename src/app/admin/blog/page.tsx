import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import BlogList from "@/components/admin/blog/BlogList";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Blog
          </h1>
          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the blog posts published on your website.
          </p>
        </div>

        <Button
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
          render={<Link href="/admin/blog/new" />}
        >
          <Plus />
          New Post
        </Button>
      </div>

      <BlogList />
    </div>
  );
}
