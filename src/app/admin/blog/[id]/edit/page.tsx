import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { adminGetBlogPostBySlug } from "@/actions/admin";
import BlogForm from "@/components/admin/blog/BlogForm";

type EditBlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const { id } = await params;

  const res = await adminGetBlogPostBySlug(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const post = res.data;

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
            Edit Blog Post
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Editing:{" "}
            <span className="font-medium">{post.title}</span>
          </p>
        </div>
      </div>

      <BlogForm post={post} postId={post.id} />
    </div>
  );
}