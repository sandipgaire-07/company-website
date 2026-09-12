import Link from "next/link";
import { CalendarDays, Pencil, User } from "lucide-react";

import { blogs } from "@/data/blogs";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteBlogDialog from "@/components/admin/blog/DeleteBlogDialog";

export default function BlogList() {
  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Blog Posts
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="
                flex flex-col gap-4 rounded-xl
                border border-[#DADEE7] p-5
                transition
                hover:border-[#0EA5E9]/40
                hover:bg-[#F8FAFC]
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              {/* Blog information */}
              <div className="flex min-w-0 gap-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="size-20 shrink-0 rounded-lg object-cover"
                />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[#0F1729]">
                      {post.title}
                    </h3>

                    <span className="rounded-full bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                      {post.category}
                    </span>
                  </div>

                  <p className="mt-1 line-clamp-2 max-w-2xl text-sm leading-6 text-[#676F7E]">
                    {post.excerpt}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#676F7E]">
                    <span className="flex items-center gap-1.5">
                      <User className="size-3.5 text-[#0EA5E9]" />
                      {post.author}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-[#0EA5E9]" />
                      {post.publishedAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    border
                    border-[#DADEE7]
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-[#0F1729]
                    transition-colors
                    hover:bg-[#F8FAFC]
                    hover:text-[#072069]
                  "
                >
                  <Pencil className="size-4" />
                  Edit
                </Link>

                <DeleteBlogDialog postTitle={post.title} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}