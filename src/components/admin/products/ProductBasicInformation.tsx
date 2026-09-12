"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { ProductFormInput } from "./ProductForm";

type ProductBasicInformationProps = {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
};

export default function ProductBasicInformation({
  register,
  errors,
}: ProductBasicInformationProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  function removeImage() {
    setImagePreview(null);
  }

  return (
    <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-[#0F1729]">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-[#676F7E]">
          Add the main information displayed on your product pages.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-5">
        {/* Product Name + Slug */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[#0F1729]"
            >
              Product Name
            </label>

            <Input
              id="name"
              placeholder="ApexFlow Hospitality"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
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
              placeholder="apexflow-hospitality"
              {...register("slug")}
            />

            {errors.slug && (
              <p className="text-sm text-red-500">
                {errors.slug.message}
              </p>
            )}
          </div>
        </div>

        {/* Category + Badge */}
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
              placeholder="Hospitality"
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
              htmlFor="badge"
              className="text-sm font-medium text-[#0F1729]"
            >
              Badge
            </label>

            <Input
              id="badge"
              placeholder="Enterprise SaaS"
              {...register("badge")}
            />

            {errors.badge && (
              <p className="text-sm text-red-500">
                {errors.badge.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-[#0F1729]"
          >
            Description
          </label>

          <Textarea
            id="description"
            rows={5}
            placeholder="Describe what this product does..."
            {...register("description")}
          />

          {errors.description && (
            <p className="text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[#0F1729]">
            Product Image
          </label>

          <div className="rounded-xl border border-dashed border-[#DADEE7] p-4">
            {imagePreview ? (
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={imagePreview}
                  alt="Product preview"
                  width={800}
                  height={500}
                  className="h-64 w-full object-fit"
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={removeImage}
                  className="absolute right-3 top-3"
                  aria-label="Remove image"
                >
                  <X />
                </Button>
              </div>
            ) : (
              <label
                htmlFor="product-image"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg px-6 py-12 text-center transition hover:bg-[#F8FAFC]"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-[#EBF0FA] text-[#072069]">
                  <Upload className="size-5" />
                </div>

                <p className="mt-4 text-sm font-medium text-[#0F1729]">
                  Choose product image
                </p>

                <p className="mt-1 text-xs text-[#676F7E]">
                  PNG, JPG or WEBP
                </p>

                <Input
                  id="product-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Color */}
        <div className="space-y-2">
          <label
            htmlFor="color"
            className="text-sm font-medium text-[#0F1729]"
          >
            Product Color
          </label>

          <Input
            id="color"
            placeholder="#0EA5E9"
            {...register("color")}
          />

          {errors.color && (
            <p className="text-sm text-red-500">
              {errors.color.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}