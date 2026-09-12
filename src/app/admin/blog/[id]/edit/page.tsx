import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { adminGetBlogPostBySlug } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import BlogForm from "@/components/admin/blog/BlogForm";

type EditBlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params;
  const res = await adminGetBlogPostBySlug(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const post = res.data;

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
            Edit Blog Post
          </h1>
          <p className="mt-1 text-sm text-[#676F7E]">
            Editing: <span className="font-medium">{post.title}</span>
          </p>
        </div>
      </div>

      <BlogForm post={post} postId={post.id} />
    </div>
  );
}
