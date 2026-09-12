"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

import { adminCreateBlogPost, adminUpdateBlogPost } from "@/actions/admin";
import { uploadImageAction } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const blogSchema = z.object({
  title: z.string().trim().min(3, "Please enter the post title."),
  slug: z.string().trim().min(2, "Please enter the URL slug."),
  category: z.string().trim().min(2, "Please enter a category."),
  author_name: z.string().trim().min(2, "Please enter the author name."),
  excerpt: z.string().trim().min(10, "Please enter an excerpt (at least 10 chars)."),
  cover_image: z.string().trim().optional(),
  content: z.string().trim().min(20, "Please enter the post content (at least 20 chars)."),
});

type BlogFormValues = z.infer<typeof blogSchema>;

type BlogFormProps = {
  post?: {
    id?: string;
    title: string;
    slug: string;
    category: string;
    author: string;
    excerpt: string;
    image?: string;
    content?: string | string[];
  };
  postId?: string;
};

export default function BlogForm({ post, postId }: BlogFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const contentValue = Array.isArray(post?.content)
    ? post.content.join("\n\n")
    : post?.content || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          category: post.category,
          author_name: post.author,
          excerpt: post.excerpt,
          cover_image: post.image || "",
          content: contentValue,
        }
      : {
          title: "",
          slug: "",
          category: "",
          author_name: "",
          excerpt: "",
          cover_image: "",
          content: "",
        },
  });

  const coverImageValue = watch("cover_image");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadImageAction(formData);
    setUploadingImage(false);

    if (res.success && res.data) {
      setValue("cover_image", res.data);
    } else {
      alert(res.error || "Failed to upload image.");
    }
  }

  async function onSubmit(values: BlogFormValues) {
    setSubmitting(true);
    setServerError(null);

    const res = postId
      ? await adminUpdateBlogPost(postId, values)
      : await adminCreateBlogPost(values);

    setSubmitting(false);

    if (!res.success) {
      setServerError(res.error || "Something went wrong. Please try again.");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Post Details
          </h2>
          <p className="mt-1 text-sm text-[#676F7E]">
            Basic metadata for this blog post.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-[#0F1729]">
                Title
              </label>
              <Input id="title" placeholder="How We Built NCT SOFT" {...register("title")} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium text-[#0F1729]">
                Slug
              </label>
              <Input id="slug" placeholder="how-we-built-nct-soft" {...register("slug")} />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-[#0F1729]">
                Category
              </label>
              <Input id="category" placeholder="Engineering" {...register("category")} />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="author_name" className="text-sm font-medium text-[#0F1729]">
                Author
              </label>
              <Input id="author_name" placeholder="NCT SOFT Team" {...register("author_name")} />
              {errors.author_name && <p className="text-sm text-red-500">{errors.author_name.message}</p>}
            </div>
          </div>

          {/* Cover Image Upload & URL input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#0F1729]">
              Cover Image
            </label>

            <div className="rounded-xl border border-dashed border-[#DADEE7] p-4">
              {coverImageValue ? (
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={coverImageValue}
                    alt="Cover preview"
                    className="h-56 w-full object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => setValue("cover_image", "")}
                    className="absolute right-3 top-3"
                    aria-label="Remove image"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="blog-cover-image"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg px-6 py-8 text-center transition hover:bg-[#F8FAFC]"
                >
                  {uploadingImage ? (
                    <Loader2 className="size-8 animate-spin text-[#072069]" />
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#EBF0FA] text-[#072069]">
                      <Upload className="size-5" />
                    </div>
                  )}

                  <p className="mt-3 text-sm font-medium text-[#0F1729]">
                    {uploadingImage ? "Uploading image..." : "Click to upload cover image"}
                  </p>

                  <p className="mt-1 text-xs text-[#676F7E]">
                    PNG, JPG, WEBP or GIF
                  </p>

                  <input
                    id="blog-cover-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingImage}
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="cover_image_url" className="text-xs text-[#676F7E]">
                Or enter image URL directly:
              </label>
              <Input
                id="cover_image_url"
                placeholder="https://example.com/image.jpg"
                {...register("cover_image")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium text-[#0F1729]">
              Excerpt
            </label>
            <Textarea id="excerpt" rows={3} placeholder="A short summary of the post…" {...register("excerpt")} />
            {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt.message}</p>}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">Content</h2>
          <p className="mt-1 text-sm text-[#676F7E]">
            Write the full body of the blog post here.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium text-[#0F1729]">
            Body
          </label>
          <Textarea id="content" rows={14} placeholder="Start writing your post…" {...register("content")} />
          {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
        </div>
      </section>

      {/* Submit */}
      <div className="flex flex-col gap-3">
        {serverError && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-200">
            {serverError}
          </p>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={submitting || uploadingImage}
            className="bg-[#072069] text-white hover:bg-[#072069]/90"
          >
            {submitting ? "Saving…" : post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
