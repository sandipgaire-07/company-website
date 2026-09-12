import { notFound } from "next/navigation";

import BlogArticle from "@/components/blogPage/BlogArticle";
import { blogs, getBlogPost } from "@/data/blogs";

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
