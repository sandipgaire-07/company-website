"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { adminCreateTestimonial, adminUpdateTestimonial } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import type { Testimonial } from "@/types/testimonial";

const testimonialSchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, "Please enter the client name."),

  companyName: z
    .string()
    .trim()
    .min(2, "Please enter the company name."),

  role: z
    .string()
    .trim()
    .min(2, "Please enter the client's role."),

  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters."),

  productName: z
    .string()
    .trim()
    .min(2, "Please enter the product name."),

  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot be more than 5."),

  avatar: z.any().optional(),
});

type TestimonialFormProps = {
  testimonial?: Testimonial;
};

export default function TestimonialForm({
  testimonial,
}: TestimonialFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(
    testimonial?.avatar ?? null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      clientName: testimonial?.clientName ?? "",
      companyName: testimonial?.companyName ?? "",
      role: testimonial?.role ?? "",
      message: testimonial?.message ?? "",
      productName: testimonial?.productName ?? "",
      rating: testimonial?.rating ?? 5,
    },
  });

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setValue("avatar", file, { shouldValidate: true });
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setValue("avatar", undefined);
    setImagePreview(testimonial?.avatar ?? null);
  }

  async function onSubmit(values: z.infer<typeof testimonialSchema>) {
    setIsSubmitting(true);
    try {
      const payload = {
        clientName: values.clientName,
        companyName: values.companyName,
        role: values.role,
        message: values.message,
        avatar: typeof values.avatar === "string" ? values.avatar : (imagePreview ?? ""),
        productName: values.productName,
        rating: Number(values.rating),
      };

      let result;
      if (testimonial?.id) {
        result = await adminUpdateTestimonial(testimonial.id, payload);
      } else {
        result = await adminCreateTestimonial(payload);
      }

      if (!result.success) {
        toast.error(result.error ?? "Something went wrong.");
        return;
      }

      toast.success(
        testimonial ? "Testimonial updated successfully." : "Testimonial added successfully."
      );
      router.push("/admin/testimonials");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Client Information
          </h2>
          <p className="mt-1 text-sm text-[#676F7E]">
            Add the basic information about the client.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Client Name */}
            <div className="space-y-2">
              <label
                htmlFor="clientName"
                className="text-sm font-medium text-[#0F1729]"
              >
                Client Name
              </label>
              <Input
                id="clientName"
                placeholder="John Doe"
                {...register("clientName")}
              />
              {errors.clientName && (
                <p className="text-sm text-red-500">
                  {errors.clientName.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label
                htmlFor="companyName"
                className="text-sm font-medium text-[#0F1729]"
              >
                Company Name
              </label>
              <Input
                id="companyName"
                placeholder="ABC Company"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Role */}
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="text-sm font-medium text-[#0F1729]"
              >
                Role
              </label>
              <Input
                id="role"
                placeholder="CEO"
                {...register("role")}
              />
              {errors.role && (
                <p className="text-sm text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Product */}
            <div className="space-y-2">
              <label
                htmlFor="productName"
                className="text-sm font-medium text-[#0F1729]"
              >
                Product
              </label>
              <Input
                id="productName"
                placeholder="ApexFlow RestroCloud"
                {...register("productName")}
              />
              {errors.productName && (
                <p className="text-sm text-red-500">
                  {errors.productName.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Testimonial
          </h2>
          <p className="mt-1 text-sm text-[#676F7E]">
            Add the client&apos;s testimonial and rating.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-5">
          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-[#0F1729]"
            >
              Testimonial Message
            </label>
            <Textarea
              id="message"
              rows={6}
              placeholder="Write the client's testimonial..."
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label
              htmlFor="rating"
              className="text-sm font-medium text-[#0F1729]"
            >
              Rating
            </label>
            <Input
              id="rating"
              type="number"
              min={1}
              max={5}
              step={1}
              {...register("rating")}
            />
            {errors.rating && (
              <p className="text-sm text-red-500">
                {errors.rating.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Avatar */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Client Avatar
          </h2>
          <p className="mt-1 text-sm text-[#676F7E]">
            Upload a profile image for the testimonial.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Preview */}
          <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#DADEE7] bg-[#F8FAFC]">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Client avatar preview"
                width={96}
                height={96}
                className="size-full object-cover"
              />
            ) : (
              <ImagePlus className="size-7 text-[#676F7E]" />
            )}
          </div>

          <div className="space-y-3">
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={removeImage}
              >
                <X />
                Remove Image
              </Button>
            )}

            {errors.avatar?.message && (
              <p className="text-sm text-red-500">
                {String(errors.avatar.message)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {testimonial ? "Updating..." : "Saving..."}
            </>
          ) : (
            testimonial ? "Update Testimonial" : "Save Testimonial"
          )}
        </Button>
      </div>
    </form>
  );
}