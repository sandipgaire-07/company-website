"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Pencil, Loader2, User, Trash2 } from "lucide-react";

import { adminGetAllBlogPosts, adminDeleteBlogPost } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  async function loadPosts() {
    setLoading(true);
    const res = await adminGetAllBlogPosts();
    if (res.success && res.data) {
      setPosts(res.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function handleDelete(id: string, title: string) {
    startTransition(async () => {
      const res = await adminDeleteBlogPost(id);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(`Failed to delete "${title}": ${res.error}`);
      }
    });
  }

  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Blog Posts
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-6 animate-spin text-[#0EA5E9]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#DADEE7] py-12 text-center">
            <p className="text-sm text-[#676F7E]">
              No blog posts found. Click &ldquo;New Post&rdquo; to create one.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-4 rounded-xl border border-[#DADEE7] p-5 transition hover:border-[#0EA5E9]/40 hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Thumbnail + info */}
                <div className="flex min-w-0 items-start gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[#EBF0FA]">
                    <Image
                      src={post.image || "/file.svg"}
                      alt={post.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-[#0EA5E9]/10 px-2 py-0.5 text-xs font-semibold text-[#072069]">
                        {post.category}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          post.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-[#0F1729] line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-sm text-[#676F7E]">
                      {post.excerpt}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#676F7E]">
                      <span className="flex items-center gap-1">
                        <User className="size-3.5 text-[#0EA5E9]" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5 text-[#0EA5E9]" />
                        {post.publishedAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#DADEE7]"
                    render={<Link href={`/admin/blog/${post.id}/edit`} />}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={isPending}
                          className="text-[#676F7E] hover:bg-red-50 hover:text-red-500"
                          aria-label={`Delete ${post.title}`}
                        />
                      }
                    >
                      <Trash2 className="size-4" />
                    </AlertDialogTrigger>

                    <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-[#DADEE7] bg-white p-6 shadow-xl">
                      <AlertDialogHeader className="items-center space-y-3 text-center">
                        <AlertDialogTitle className="text-xl font-semibold text-[#0F1729]">
                          Delete blog post?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-sm leading-6 text-[#676F7E]">
                          Are you sure you want to delete{" "}
                          <span className="font-semibold text-[#0F1729]">
                            {post.title}
                          </span>
                          ? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-6 flex-row justify-center gap-3 sm:justify-center">
                        <AlertDialogCancel className="mt-0 border-[#DADEE7] bg-white text-[#0F1729] hover:bg-[#F8FAFC]">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post.id, post.title)}
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete Post
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
