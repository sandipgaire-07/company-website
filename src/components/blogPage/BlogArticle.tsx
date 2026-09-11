import Image from "next/image";
import { CalendarDays, User } from "lucide-react";

import type { BlogPost } from "@/types/blog";

export default function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <main>
      <section className="px-4 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            {post.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-[#0F1729] sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#676F7E]">
            <span className="inline-flex items-center gap-2">
              <User className="size-4 text-[#072069]" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-[#072069]" />
              {post.publishedAt}
            </span>
          </div>
          <div className="mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
        </div>
      </section>

      <article className="bg-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-[#EBF0FA]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          <div className="mt-10 space-y-6">
            {post.content.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-[#676F7E]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
