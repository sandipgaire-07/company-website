"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, Upload, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { HomepageSection } from "@/types/homepageSection";
import { updateHomepageSection } from "@/actions/homepageSection";
import { uploadImageAction } from "@/actions/upload";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const homepageSectionSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  image: z.string().nullable().optional(),
  sortOrder: z.coerce.number().min(1, "Order must be a positive number"),
  isActive: z.boolean(),
});

export type HomepageSectionFormValues = z.infer<typeof homepageSectionSchema>;

type HomepageSectionFormProps = {
  section: HomepageSection;
};

export default function HomepageSectionForm({ section }: HomepageSectionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HomepageSectionFormValues>({
    resolver: zodResolver(homepageSectionSchema) as any,
    defaultValues: {
      title: section.title,
      description: section.description,
      image: section.image || "",
      sortOrder: section.sortOrder,
      isActive: section.isActive,
    },
  });

  const currentImage = watch("image");
  const isActive = watch("isActive");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadImageAction(formData);
    setUploadingImage(false);

    if (res.success && res.data) {
      setValue("image", res.data, { shouldValidate: true });
      toast.success("Image uploaded successfully");
    } else {
      toast.error(res.error || "Failed to upload image");
    }
  }

  function handleRemoveImage() {
    setValue("image", "", { shouldValidate: true });
  }

  async function onSubmit(values: HomepageSectionFormValues) {
    setIsSubmitting(true);
    setServerError(null);

    const res = await updateHomepageSection(section.id, values);

    setIsSubmitting(false);

    if (res.success) {
      toast.success(`Homepage section "${section.sectionKey}" updated successfully`);
      router.push("/admin/homepage");
      router.refresh();
    } else {
      setServerError(res.error || "Failed to save section changes");
      toast.error(res.error || "Failed to save section changes");
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/homepage"
          className="inline-flex items-center text-sm font-medium text-[#676F7E] hover:text-[#072069] transition-colors"
        >
          <ArrowLeft className="size-4 mr-2" /> Back to Homepage Sections
        </Link>
      </div>

      <Card className="border-[#DADEE7] shadow-sm">
        <CardHeader className="border-b border-[#DADEE7]/60 pb-5">
          <CardTitle className="text-xl font-bold text-[#0F1729]">
            Edit Section: <span className="capitalize">{section.sectionKey}</span>
          </CardTitle>
          <CardDescription className="text-sm text-[#676F7E] mt-1">
            Update title, description, image, order, and visibility for this section.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {serverError && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Read-Only Section Key */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#0F1729]">
                Section Identifier
              </Label>
              <Input
                value={section.sectionKey}
                disabled
                readOnly
                className="bg-slate-100 font-mono text-slate-600 border-[#DADEE7] cursor-not-allowed uppercase"
              />
              <p className="text-xs text-[#676F7E]">
                The section key is a unique system identifier and cannot be changed.
              </p>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-[#0F1729]">
                Section Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter section heading title"
                {...register("title")}
                className="border-[#DADEE7] focus:border-[#0EA5E9]"
              />
              {errors.title && (
                <p className="text-xs text-red-600 font-medium">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-[#0F1729]">
                Section Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Enter section description text"
                {...register("description")}
                className="border-[#DADEE7] focus:border-[#0EA5E9]"
              />
              {errors.description && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#0F1729]">
                Section Image (Optional)
              </Label>
              
              {currentImage ? (
                <div className="relative rounded-xl border border-[#DADEE7] p-3 bg-[#F8FAFC] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative size-16 shrink-0 rounded-lg overflow-hidden border bg-white">
                      <Image
                        src={currentImage}
                        alt="Section Image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-medium text-[#0F1729] truncate max-w-md">
                        {currentImage}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="size-4 mr-1" /> Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#DADEE7] p-6 text-center bg-[#F8FAFC] hover:bg-slate-100/50 transition-colors">
                  <ImageIcon className="size-8 text-[#676F7E] mb-2" />
                  <p className="text-sm font-medium text-[#0F1729]">Upload Section Image</p>
                  <p className="text-xs text-[#676F7E] mt-1 mb-4">PNG, JPG, WEBP formats supported</p>
                  
                  <label className="inline-flex items-center gap-2 rounded-lg bg-[#072069] px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-[#072069]/90 transition-colors">
                    {uploadingImage ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Upload className="size-4" />
                    )}
                    {uploadingImage ? "Uploading..." : "Choose File"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Grid row: Display Order & Active */}
            <div className="grid gap-6 sm:grid-cols-2 pt-2">
              {/* Display Order */}
              <div className="space-y-2">
                <Label htmlFor="sortOrder" className="text-sm font-semibold text-[#0F1729]">
                  Display Order <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="sortOrder"
                  type="number"
                  min={1}
                  {...register("sortOrder")}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                <p className="text-xs text-[#676F7E]">
                  Controls the relative vertical order of this section on the homepage.
                </p>
                {errors.sortOrder && (
                  <p className="text-xs text-red-600 font-medium">
                    {errors.sortOrder.message}
                  </p>
                )}
              </div>

              {/* Active Toggle */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F1729]">
                  Visibility Status
                </Label>
                <div className="flex items-center justify-between rounded-lg border border-[#DADEE7] p-3 bg-white">
                  <div>
                    <p className="text-sm font-medium text-[#0F1729]">
                      {isActive ? "Section Active" : "Section Inactive"}
                    </p>
                    <p className="text-xs text-[#676F7E]">
                      {isActive
                        ? "Visible on public homepage"
                        : "Hidden from public homepage"}
                    </p>
                  </div>
                  <Switch
                    checked={isActive}
                    onCheckedChange={(checked) =>
                      setValue("isActive", checked, { shouldValidate: true })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DADEE7]/60">
              <Link href="/admin/homepage">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  className="border-[#DADEE7]"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting || uploadingImage}
                className="bg-[#072069] text-white hover:bg-[#072069]/90 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
