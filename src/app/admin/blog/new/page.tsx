import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import BlogForm from "@/components/admin/blog/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/blog"
          className="
            inline-flex
            size-9
            items-center
            justify-center
            rounded-md
            bg-[#072069]
            text-white
            transition-colors
            hover:bg-[#072069]/90
          "
          aria-label="Back to blog"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Add Blog Post
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Create a new blog post for your website.
          </p>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}