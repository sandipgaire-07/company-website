import { notFound } from "next/navigation";

import BlogArticle from "@/components/blogPage/BlogArticle";
import { getBlogPost } from "@/data/blogs";
import { adminGetBlogPostBySlug } from "@/actions/admin";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticPost = getBlogPost(slug);
  const dbRes = await adminGetBlogPostBySlug(slug);

  const post = dbRes.success && dbRes.data ? dbRes.data : staticPost;

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
