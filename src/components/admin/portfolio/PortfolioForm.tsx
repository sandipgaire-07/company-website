"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { PortfolioItem } from "@/types/portfolio";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const portfolioSchema = z.object({
  projectName: z.string().trim().min(1, "Project Name is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  client: z.string().trim().min(1, "Client name is required"),
  category: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().min(1, "Description is required"),
  technologies: z
    .array(z.object({ name: z.string().trim().min(1, "Technology cannot be empty") }))
    .min(1, "At least one technology is required"),
  projectImage: z.string().trim().min(1, "Project Image path/URL is required"),
  projectUrl: z.string().optional(),
  caseStudy: z.string().trim().min(1, "Case Study content is required"),
  completionDate: z.string().trim().min(1, "Completion Date is required"),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  sortOrder: z.coerce.number().int().min(0, "Sort Order must be 0 or greater"),
});

export type PortfolioFormValues = z.infer<typeof portfolioSchema>;

type PortfolioFormProps = {
  initialData?: PortfolioItem;
};

export default function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gallery, setGallery] = useState<string[]>(
    initialData?.imageGallery && initialData.imageGallery.length > 0
      ? initialData.imageGallery
      : [initialData?.projectImage || "/showcase/hospitality.webp"]
  );
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema) as any,
    defaultValues: initialData
      ? {
          projectName: initialData.projectName,
          slug: initialData.slug,
          client: initialData.client,
          category: initialData.category,
          description: initialData.description,
          technologies: initialData.technologies.map((tech) => ({ name: tech })),
          projectImage: initialData.projectImage,
          projectUrl: initialData.projectUrl || "",
          caseStudy: initialData.caseStudy,
          completionDate: initialData.completionDate,
          isFeatured: initialData.isFeatured,
          isPublished: initialData.isPublished,
          sortOrder: initialData.sortOrder,
        }
      : {
          projectName: "",
          slug: "",
          client: "",
          category: "Web Application",
          description: "",
          technologies: [{ name: "Next.js" }, { name: "TypeScript" }, { name: "Tailwind CSS" }],
          projectImage: "/showcase/hospitality.webp",
          projectUrl: "",
          caseStudy: "",
          completionDate: new Date().toISOString().split("T")[0],
          isFeatured: false,
          isPublished: true,
          sortOrder: 1,
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "technologies",
  });

  const projectName = watch("projectName");
  const isFeatured = watch("isFeatured");
  const isPublished = watch("isPublished");
  const projectImage = watch("projectImage");

  // Slug auto-generation helper
  function handleGenerateSlug() {
    if (!projectName) {
      toast.error("Please enter a Project Name first");
      return;
    }
    const generatedSlug = projectName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setValue("slug", generatedSlug, { shouldValidate: true });
    toast.success(`Generated slug: ${generatedSlug}`);
  }

  // Gallery handlers
  function handleAddGalleryImage() {
    if (!newGalleryUrl.trim()) return;
    setGallery((prev) => [...prev, newGalleryUrl.trim()]);
    setNewGalleryUrl("");
    toast.success("Added image to gallery");
  }

  function handleRemoveGalleryImage(index: number) {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSubmit(values: PortfolioFormValues) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsSubmitting(false);

    const formattedPayload: PortfolioItem = {
      id: initialData ? initialData.id : String(Date.now()),
      projectName: values.projectName,
      slug: values.slug,
      client: values.client,
      category: values.category,
      description: values.description,
      technologies: values.technologies.map((t) => t.name),
      projectImage: values.projectImage,
      imageGallery: gallery.length > 0 ? gallery : [values.projectImage],
      projectUrl: values.projectUrl || undefined,
      caseStudy: values.caseStudy,
      completionDate: values.completionDate,
      isFeatured: values.isFeatured,
      isPublished: values.isPublished,
      sortOrder: values.sortOrder,
    };

    if (isEditing) {
      toast.success(`Project "${formattedPayload.projectName}" updated successfully`);
    } else {
      toast.success(`Project "${formattedPayload.projectName}" created successfully`);
    }

    router.push("/admin/portfolio");
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header & Back button */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          size="icon"
          render={
            <Link href="/admin/portfolio">
              <ArrowLeft className="size-4" />
            </Link>
          }
          className="bg-[#072069] text-white hover:bg-[#072069]/90 shrink-0"
        />

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            {isEditing ? "Edit Portfolio Project" : "Add Portfolio Project"}
          </h1>
          <p className="text-sm text-[#676F7E]">
            {isEditing
              ? `Update details for project "${initialData.projectName}"`
              : "Create a new project showcase for your portfolio."}
          </p>
        </div>
      </div>

      <Card className="border-[#DADEE7] shadow-sm">
        <CardHeader className="border-b border-[#DADEE7]/60 pb-5">
          <CardTitle className="text-lg font-bold text-[#0F1729]">
            Project Details
          </CardTitle>
          <CardDescription className="text-sm text-[#676F7E]">
            Fields marked with * are required.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Name & Slug */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-sm font-semibold text-[#0F1729]">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="projectName"
                  placeholder="e.g. Hospitality Management Platform"
                  {...register("projectName")}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                {errors.projectName && (
                  <p className="text-xs text-red-600 font-medium">
                    {errors.projectName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-semibold text-[#0F1729]">
                  URL Slug <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    placeholder="hospitality-management-platform"
                    {...register("slug")}
                    className="font-mono text-xs border-[#DADEE7] focus:border-[#0EA5E9]"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateSlug}
                    className="border-[#DADEE7] shrink-0 text-[#072069]"
                  >
                    <Sparkles className="size-4 mr-1 text-[#0EA5E9]" />
                    Generate
                  </Button>
                </div>
                {errors.slug && (
                  <p className="text-xs text-red-600 font-medium">
                    {errors.slug.message}
                  </p>
                )}
              </div>
            </div>

            {/* Client & Category */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client" className="text-sm font-semibold text-[#0F1729]">
                  Client <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="client"
                  placeholder="e.g. ABC Hospitality Group"
                  {...register("client")}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                {errors.client && (
                  <p className="text-xs text-red-600 font-medium">
                    {errors.client.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-[#0F1729]">
                  Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  {...register("category")}
                  className="w-full h-9 rounded-lg border border-[#DADEE7] bg-white px-3 py-1.5 text-sm text-[#0F1729] outline-none focus:border-[#0EA5E9]"
                >
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Healthcare Tech">Healthcare Tech</option>
                  <option value="Workforce Tech">Workforce Tech</option>
                  <option value="FinTech">FinTech</option>
                  <option value="Enterprise Solution">Enterprise Solution</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-red-600 font-medium">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-[#0F1729]">
                Short Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="A concise summary of the project for cards and lists..."
                {...register("description")}
                className="border-[#DADEE7] focus:border-[#0EA5E9]"
              />
              {errors.description && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Technologies (Field Array) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-[#0F1729]">
                  Technologies Used <span className="text-red-500">*</span>
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "" })}
                  className="border-[#DADEE7] text-[#072069]"
                >
                  <Plus className="size-3.5 mr-1" /> Add Technology
                </Button>
              </div>

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      placeholder="e.g. Next.js, TypeScript, PostgreSQL"
                      {...register(`technologies.${index}.name` as const)}
                      className="border-[#DADEE7] focus:border-[#0EA5E9]"
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                        className="border-[#DADEE7] text-red-600 hover:bg-red-50 shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {errors.technologies && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.technologies.message}
                </p>
              )}
            </div>

            {/* Main Project Image */}
            <div className="space-y-2">
              <Label htmlFor="projectImage" className="text-sm font-semibold text-[#0F1729]">
                Main Project Image Path / URL <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-4 items-center">
                <Input
                  id="projectImage"
                  placeholder="/showcase/hospitality.webp"
                  {...register("projectImage")}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                <div className="relative size-12 rounded-lg border border-[#DADEE7] overflow-hidden shrink-0 bg-[#F8FAFC]">
                  {projectImage ? (
                    <Image
                      src={projectImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-[#676F7E]">
                      <ImageIcon className="size-5" />
                    </div>
                  )}
                </div>
              </div>
              {errors.projectImage && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.projectImage.message}
                </p>
              )}
            </div>

            {/* Image Gallery */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-[#0F1729]">
                Image Gallery
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl border border-[#DADEE7] overflow-hidden bg-[#F8FAFC] h-24 flex flex-col items-center justify-center p-2 text-center"
                  >
                    <Image
                      src={img || "/showcase/hospitality.webp"}
                      alt={`Gallery ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleRemoveGalleryImage(idx)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                      Image {idx + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <Input
                  placeholder="Enter additional image URL or path..."
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddGalleryImage}
                  className="border-[#DADEE7] text-[#072069] shrink-0"
                >
                  <Plus className="size-4 mr-1" /> Add Image
                </Button>
              </div>
            </div>

            {/* Project URL */}
            <div className="space-y-2">
              <Label htmlFor="projectUrl" className="text-sm font-semibold text-[#0F1729]">
                Live Project URL (Optional)
              </Label>
              <Input
                id="projectUrl"
                type="url"
                placeholder="https://example.com"
                {...register("projectUrl")}
                className="border-[#DADEE7] focus:border-[#0EA5E9]"
              />
            </div>

            {/* Case Study Content */}
            <div className="space-y-2">
              <Label htmlFor="caseStudy" className="text-sm font-semibold text-[#0F1729]">
                Case Study Content <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="caseStudy"
                rows={8}
                placeholder="Enter complete case study content (Markdown format supported)..."
                {...register("caseStudy")}
                className="border-[#DADEE7] focus:border-[#0EA5E9] font-mono text-xs"
              />
              {errors.caseStudy && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.caseStudy.message}
                </p>
              )}
            </div>

            {/* Completion Date & Display Order */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="completionDate" className="text-sm font-semibold text-[#0F1729]">
                  Completion Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="completionDate"
                  type="date"
                  {...register("completionDate")}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                {errors.completionDate && (
                  <p className="text-xs text-red-600 font-medium">
                    {errors.completionDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder" className="text-sm font-semibold text-[#0F1729]">
                  Display Order (Numerical) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="sortOrder"
                  type="number"
                  min={0}
                  {...register("sortOrder")}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                {errors.sortOrder && (
                  <p className="text-xs text-red-600 font-medium">
                    {errors.sortOrder.message}
                  </p>
                )}
              </div>
            </div>

            {/* Switches: Published & Featured */}
            <div className="grid gap-6 sm:grid-cols-2 pt-2 border-t border-[#DADEE7]/60">
              <div className="flex items-center justify-between rounded-lg border border-[#DADEE7] p-3.5 bg-[#F8FAFC]">
                <div>
                  <p className="text-sm font-semibold text-[#0F1729]">Published Status</p>
                  <p className="text-xs text-[#676F7E]">
                    {isPublished ? "Visible on public portfolio page" : "Hidden from public page"}
                  </p>
                </div>
                <Switch
                  checked={isPublished}
                  onCheckedChange={(val) => setValue("isPublished", val)}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[#DADEE7] p-3.5 bg-[#F8FAFC]">
                <div>
                  <p className="text-sm font-semibold text-[#0F1729]">Featured Project</p>
                  <p className="text-xs text-[#676F7E]">
                    {isFeatured ? "Highlighted on homepage / top banner" : "Standard showcase item"}
                  </p>
                </div>
                <Switch
                  checked={isFeatured}
                  onCheckedChange={(val) => setValue("isFeatured", val)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DADEE7]/60">
              <Link href="/admin/portfolio">
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
                disabled={isSubmitting}
                className="bg-[#072069] text-white hover:bg-[#072069]/90 min-w-[140px]"
              >
                <Save className="size-4 mr-1.5" />
                {isEditing ? "Save Changes" : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
