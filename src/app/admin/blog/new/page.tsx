import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import BlogForm from "@/components/admin/blog/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-[#676F7E] hover:bg-[#F8FAFC]"
          render={<Link href="/admin/blog" />}
          aria-label="Back to blog"
        >
          <ArrowLeft className="size-5" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            New Blog Post
          </h1>
          <p className="mt-1 text-sm text-[#676F7E]">
            Write and publish a new post to your blog.
          </p>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}
