"use client";

import { useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { Company } from "@/types/company";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const collaborationSchema = z.object({
  name: z.string().trim().min(2, "Please enter the company name."),
  logo: z.instanceof(File).optional(),
});

type CollaborationFormValues = z.infer<typeof collaborationSchema>;

type CollaborationFormProps = {
  collaboration?: Company;
};

export default function CollaborationForm({
  collaboration,
}: CollaborationFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    collaboration?.logo ?? null
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CollaborationFormValues>({
    resolver: zodResolver(collaborationSchema),

    defaultValues: {
      name: collaboration?.name ?? "",
    },
  });

  function handleLogoChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue("logo", file);

    setLogoPreview(URL.createObjectURL(file));
  }

  function removeLogo() {
    setValue("logo", undefined);
    setLogoPreview(collaboration?.logo ?? null);
  }

  function onSubmit(values: CollaborationFormValues) {
    console.log("Collaboration:", values);

    // API will be connected later.
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Collaboration Information
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Add the company name and logo for this collaboration.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[#0F1729]"
            >
              Company Name
            </label>

            <Input
              id="name"
              placeholder="Company Name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Logo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0F1729]">
              Company Logo
            </label>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Preview */}
              <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#DADEE7] bg-[#F8FAFC]">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Company logo preview"
                    className="size-full object-contain p-3"
                  />
                ) : (
                  <ImagePlus className="size-7 text-[#676F7E]" />
                )}
              </div>

              {/* Upload controls */}
              <div className="space-y-3">
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
                  {logoPreview ? "Change Logo" : "Upload Logo"}

                  <input
                    id="company-logo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>

                {logoPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeLogo}
                    className="
                      ml-2
                      border-[#DADEE7]
                      text-red-500
                      hover:bg-red-50
                      hover:text-red-600
                    "
                  >
                    <X className="size-4" />
                    Remove
                  </Button>
                )}

                <p className="text-xs text-[#676F7E]">
                  PNG, JPG, WEBP, or SVG.
                </p>
              </div>
            </div>

            {errors.logo && (
              <p className="text-sm text-red-500">
                {errors.logo.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
        >
          {collaboration ? "Update Collaboration" : "Save Collaboration"}
        </Button>
      </div>
    </form>
  );
}