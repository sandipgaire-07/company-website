"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Plus, Trash2, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import type { TeamMember } from "@/types/team";

const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter the team member's name."),

  position: z
    .string()
    .trim()
    .min(2, "Please enter the position."),

  biography: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters."),

  profileImage: z.any().optional(),

  socialLinks: z.array(
    z.object({
      platform: z.string().trim().min(1, "Please enter a platform name."),
      url: z.string().trim().url("Please enter a valid URL."),
    })
  ),

  sortOrder: z.coerce
    .number()
    .min(1, "Display order must be at least 1."),

  isActive: z.boolean(),
});

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

type TeamMemberFormProps = {
  teamMember?: TeamMember;
};

export default function TeamMemberForm({
  teamMember,
}: TeamMemberFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(
    teamMember?.profileImage ?? null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema) as any,
    defaultValues: {
      name: teamMember?.name ?? "",
      position: teamMember?.position ?? "",
      biography: teamMember?.biography ?? "",
      socialLinks: teamMember?.socialLinks?.length
        ? teamMember.socialLinks
        : [{ platform: "", url: "" }],
      sortOrder: teamMember?.sortOrder ?? 1,
      isActive: teamMember?.isActive ?? true,
    },
  });

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const isActive = watch("isActive");

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setValue("profileImage", file, { shouldValidate: true });
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setValue("profileImage", undefined);
    setImagePreview(teamMember?.profileImage ?? null);
  }

  async function onSubmit(values: TeamMemberFormValues) {
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call when backend is connected
      // const payload = {
      //   name: values.name,
      //   position: values.position,
      //   biography: values.biography,
      //   profileImage: typeof values.profileImage === "string"
      //     ? values.profileImage
      //     : (imagePreview ?? ""),
      //   socialLinks: values.socialLinks,
      //   sortOrder: values.sortOrder,
      //   isActive: values.isActive,
      // };
      //
      // let result;
      // if (teamMember?.id) {
      //   result = await adminUpdateTeamMember(teamMember.id, payload);
      // } else {
      //   result = await adminCreateTeamMember(payload);
      // }

      // Simulate API delay for mock
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success(
        teamMember
          ? "Team member updated successfully."
          : "Team member added successfully."
      );

      router.push("/admin/team");
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
            Basic Information
          </h2>
          <p className="mt-1 text-sm text-[#676F7E]">
            Add the basic information about the team member.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-[#0F1729]"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Position */}
            <div className="space-y-2">
              <label
                htmlFor="position"
                className="text-sm font-medium text-[#0F1729]"
              >
                Position
              </label>
              <Input
                id="position"
                placeholder="Chief Executive Officer"
                {...register("position")}
              />
              {errors.position && (
                <p className="text-sm text-red-500">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <label
              htmlFor="biography"
              className="text-sm font-medium text-[#0F1729]"
            >
              Biography
            </label>
            <Textarea
              id="biography"
              rows={4}
              placeholder="Write a short professional biography..."
              {...register("biography")}
            />
            {errors.biography && (
              <p className="text-sm text-red-500">
                {errors.biography.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Display Order */}
            <div className="space-y-2">
              <label
                htmlFor="sortOrder"
                className="text-sm font-medium text-[#0F1729]"
              >
                Display Order
              </label>
              <Input
                id="sortOrder"
                type="number"
                min={1}
                step={1}
                {...register("sortOrder")}
              />
              {errors.sortOrder && (
                <p className="text-sm text-red-500">
                  {errors.sortOrder.message}
                </p>
              )}
            </div>

            {/* Active Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0F1729]">
                Active
              </label>
              <div className="flex items-center gap-3 pt-1">
                <Switch
                  checked={isActive}
                  onCheckedChange={(checked) => setValue("isActive", checked)}
                />
                <span className="text-sm text-[#676F7E]">
                  {isActive
                    ? "Visible on the public website"
                    : "Hidden from the public website"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Image */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Profile Image
          </h2>
          <p className="mt-1 text-sm text-[#676F7E]">
            Upload a profile image for the team member.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Preview */}
          <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#DADEE7] bg-[#F8FAFC]">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile image preview"
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

            {errors.profileImage?.message && (
              <p className="text-sm text-red-500">
                {String(errors.profileImage.message)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#0F1729]">
              Social Links
            </h2>
            <p className="mt-1 text-sm text-[#676F7E]">
              Add the team member&apos;s social media profiles.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => appendSocialLink({ platform: "", url: "" })}
          >
            <Plus />
            Add
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          {socialLinkFields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2 sm:flex-row">
              <div className="space-y-2 sm:w-1/3">
                <Input
                  placeholder="LinkedIn"
                  {...register(`socialLinks.${index}.platform`)}
                />
                {errors.socialLinks?.[index]?.platform && (
                  <p className="text-sm text-red-500">
                    {errors.socialLinks[index].platform?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-1 gap-2">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="https://linkedin.com/in/username"
                    {...register(`socialLinks.${index}.url`)}
                  />
                  {errors.socialLinks?.[index]?.url && (
                    <p className="text-sm text-red-500">
                      {errors.socialLinks[index].url?.message}
                    </p>
                  )}
                </div>

                {socialLinkFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSocialLink(index)}
                    className="shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            </div>
          ))}
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
              {teamMember ? "Updating..." : "Saving..."}
            </>
          ) : (
            teamMember ? "Update Team Member" : "Save Team Member"
          )}
        </Button>
      </div>
    </form>
  );
}
