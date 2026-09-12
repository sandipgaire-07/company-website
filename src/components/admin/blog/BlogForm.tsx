"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import type { BlogPost } from "@/types/blog";

const blogSchema = z.object({
  title: z.string().trim().min(2, "Please enter the blog title."),

  slug: z.string().trim().min(2, "Please enter the blog slug."),

  category: z.string().trim().min(2, "Please enter the category."),

  excerpt: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters."),

  content: z
    .string()
    .trim()
    .min(20, "Please enter the blog content."),

  image: z.string().trim().min(1, "Please enter the image path."),

  author: z.string().trim().min(2, "Please enter the author name."),

  publishedAt: z
    .string()
    .trim()
    .min(2, "Please enter the published date."),
});

type BlogFormValues = z.infer<typeof blogSchema>;

type BlogFormProps = {
  blog?: BlogPost;
};

export default function BlogForm({ blog }: BlogFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),

    defaultValues: {
      title: blog?.title ?? "",
      slug: blog?.slug ?? "",
      category: blog?.category ?? "",
      excerpt: blog?.excerpt ?? "",
      content: blog?.content?.join("\n\n") ?? "",
      image: blog?.image ?? "",
      author: blog?.author ?? "",
      publishedAt: blog?.publishedAt ?? "",
    },
  });

  function onSubmit(values: BlogFormValues) {
    const content = values.content
      .split("\n\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const blogData = {
      ...values,
      content,
    };

    console.log("Blog:", blogData);

    // API will be connected later.
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Blog Information
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Add the basic information for your blog post.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-5">
          {/* Title + Slug */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-[#0F1729]"
              >
                Title
              </label>

              <Input
                id="title"
                placeholder="Building Better Digital Workflows for Growing Businesses"
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="slug"
                className="text-sm font-medium text-[#0F1729]"
              >
                Slug
              </label>

              <Input
                id="slug"
                placeholder="building-better-digital-workflows"
                {...register("slug")}
              />

              {errors.slug && (
                <p className="text-sm text-red-500">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>

          {/* Category + Author */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-[#0F1729]"
              >
                Category
              </label>

              <Input
                id="category"
                placeholder="Business Technology"
                {...register("category")}
              />

              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="author"
                className="text-sm font-medium text-[#0F1729]"
              >
                Author
              </label>

              <Input
                id="author"
                placeholder="LeafClutch Team"
                {...register("author")}
              />

              {errors.author && (
                <p className="text-sm text-red-500">
                  {errors.author.message}
                </p>
              )}
            </div>
          </div>

          {/* Published Date + Image */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="publishedAt"
                className="text-sm font-medium text-[#0F1729]"
              >
                Published Date
              </label>

              <Input
                id="publishedAt"
                placeholder="September 5, 2026"
                {...register("publishedAt")}
              />

              {errors.publishedAt && (
                <p className="text-sm text-red-500">
                  {errors.publishedAt.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-sm font-medium text-[#0F1729]"
              >
                Image
              </label>

              <Input
                id="image"
                placeholder="/blog/workflows.webp"
                {...register("image")}
              />

              {errors.image && (
                <p className="text-sm text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label
              htmlFor="excerpt"
              className="text-sm font-medium text-[#0F1729]"
            >
              Excerpt
            </label>

            <Textarea
              id="excerpt"
              rows={4}
              placeholder="Write a short summary of the blog post..."
              {...register("excerpt")}
            />

            {errors.excerpt && (
              <p className="text-sm text-red-500">
                {errors.excerpt.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Blog Content
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Separate paragraphs with an empty line.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-2">
          <label
            htmlFor="content"
            className="text-sm font-medium text-[#0F1729]"
          >
            Content
          </label>

          <Textarea
            id="content"
            rows={18}
            placeholder={`Write your blog content here...

Start your first paragraph.

Write your second paragraph.

Continue with the next paragraph.`}
            className="resize-y"
            {...register("content")}
          />

          {errors.content && (
            <p className="text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
        >
          {blog ? "Update Post" : "Save Post"}
        </Button>
      </div>
    </form>
  );
}