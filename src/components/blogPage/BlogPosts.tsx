import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, User } from "lucide-react";

import { blogs } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPosts() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <Card
              key={post.id}
              className="group flex h-full flex-col overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#EBF0FA]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="w-fit rounded-full bg-[#0EA5E9]/10 px-3 py-1 text-xs font-semibold text-[#072069]">
                  {post.category}
                </span>
                <h2 className="mt-4 text-xl font-bold leading-snug text-[#0F1729]">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#676F7E]">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#DADEE7] pt-4 text-xs text-[#676F7E]">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5 text-[#072069]" />
                    {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5 text-[#072069]" />
                    {post.publishedAt}
                  </span>
                </div>
                <Button
                  render={
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowUpRight className="size-4 text-[#072069]" />
                    </Link>
                  }
                  nativeButton={false}
                  variant="outline"
                  className="mt-6 w-full border-[#DADEE7] text-[#072069] hover:border-[#0EA5E9] hover:bg-[#F8FAFC]"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
