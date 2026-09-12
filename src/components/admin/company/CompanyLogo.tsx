"use client";

import { useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type CompanyLogoProps = {
  currentLogo?: string;
};

export default function CompanyLogo({
  currentLogo = "/logo.png",
}: CompanyLogoProps) {
  const [preview, setPreview] = useState<string | null>(currentLogo);

  function handleLogoChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    // Supabase upload will be added later.
  }

  function removeLogo() {
    setPreview(null);
  }

  return (
    <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-[#0F1729]">
          Company Logo
        </h2>

        <p className="mt-1 text-sm text-[#676F7E]">
          Manage the logo displayed across your website.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Logo Preview */}
        <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#DADEE7] bg-[#F8FAFC]">
          {preview ? (
            <img
              src={preview}
              alt="Company logo preview"
              className="size-full object-contain p-3"
            />
          ) : (
            <ImagePlus className="size-8 text-[#676F7E]" />
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <label
              htmlFor="company-logo"
              className="
                inline-flex
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-md
                bg-[#072069]
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition-colors
                hover:bg-[#072069]/90
              "
            >
              <Upload className="size-4" />
              {preview ? "Change Logo" : "Upload Logo"}

              <input
                id="company-logo"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>

            {preview && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeLogo}
                className="border-[#DADEE7] text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <X className="size-4" />
                Remove
              </Button>
            )}
          </div>

          <p className="text-xs text-[#676F7E]">
            PNG, JPG, WEBP, or SVG. Recommended: square logo.
          </p>
        </div>
      </div>
    </section>
  );
}