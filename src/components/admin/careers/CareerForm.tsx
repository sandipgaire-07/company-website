"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import type { Job } from "@/types/job";

const careerSchema = z.object({
  slug: z.string().trim().min(2, "Please enter the job slug."),

  title: z.string().trim().min(2, "Please enter the job title."),

  description: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters."),

  location: z.string().trim().min(2, "Please enter the location."),

  applicationDeadline: z
    .string()
    .trim()
    .min(2, "Please enter the application deadline."),

  href: z.string().trim().min(1, "Please enter the job URL."),

  responsibilities: z.array(
    z.object({
      value: z.string().trim().min(3, "Please enter a responsibility."),
    })
  ),

  requirements: z.array(
    z.object({
      value: z.string().trim().min(3, "Please enter a requirement."),
    })
  ),

  qualifications: z.array(
    z.object({
      value: z.string().trim().min(3, "Please enter a qualification."),
    })
  ),
});

type CareerFormValues = z.infer<typeof careerSchema>;

type CareerFormProps = {
  job?: Job;
};

export default function CareerForm({ job }: CareerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema),

    defaultValues: job
      ? {
          slug: job.slug,
          title: job.title,
          description: job.description,
          location: job.location,
          applicationDeadline: job.applicationDeadline,
          href: job.href,
          responsibilities: job.responsibilities.map((value) => ({ value })),
          requirements: job.requirements.map((value) => ({ value })),
          qualifications: job.qualifications.map((value) => ({ value })),
        }
      : {
          slug: "",
          title: "",
          description: "",
          location: "",
          applicationDeadline: "",
          href: "",
          responsibilities: [{ value: "" }],
          requirements: [{ value: "" }],
          qualifications: [{ value: "" }],
        },
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "responsibilities",
  });

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control,
    name: "requirements",
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  function onSubmit(values: CareerFormValues) {
    console.log("Job:", {
      ...values,
      responsibilities: values.responsibilities.map(({ value }) => value),
      requirements: values.requirements.map(({ value }) => value),
      qualifications: values.qualifications.map(({ value }) => value),
    });

    // API will be connected later.
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
            Add the basic information for this job opening.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-[#0F1729]"
              >
                Job Title
              </label>

              <Input
                id="title"
                placeholder="Frontend Developer"
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
                placeholder="frontend-developer"
                {...register("slug")}
              />

              {errors.slug && (
                <p className="text-sm text-red-500">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>

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
              placeholder="Build polished, accessible interfaces..."
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-sm font-medium text-[#0F1729]"
              >
                Location
              </label>

              <Input
                id="location"
                placeholder="Butwal, Nepal"
                {...register("location")}
              />

              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="applicationDeadline"
                className="text-sm font-medium text-[#0F1729]"
              >
                Application Deadline
              </label>

              <Input
                id="applicationDeadline"
                placeholder="October 15, 2026"
                {...register("applicationDeadline")}
              />

              {errors.applicationDeadline && (
                <p className="text-sm text-red-500">
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="href"
                className="text-sm font-medium text-[#0F1729]"
              >
                Job URL
              </label>

              <Input
                id="href"
                placeholder="/career/frontend-developer"
                {...register("href")}
              />

              {errors.href && (
                <p className="text-sm text-red-500">
                  {errors.href.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#0F1729]">
              Responsibilities
            </h2>

            <p className="mt-1 text-sm text-[#676F7E]">
              Add the responsibilities for this role.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => appendResponsibility({ value: "" })}
          >
            <Plus />
            Add
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          {responsibilityFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Build responsive interfaces with React and Next.js."
                  {...register(`responsibilities.${index}.value`)}
                />

                {errors.responsibilities?.[index] && (
                  <p className="text-sm text-red-500">
                    {errors.responsibilities[index]?.message}
                  </p>
                )}
              </div>

              {responsibilityFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeResponsibility(index)}
                  className="shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#0F1729]">
              Requirements
            </h2>

            <p className="mt-1 text-sm text-[#676F7E]">
              Add the skills and experience required for this role.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => appendRequirement({ value: "" })}
          >
            <Plus />
            Add
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          {requirementFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Solid experience with React and TypeScript."
                  {...register(`requirements.${index}.value`)}
                />

                {errors.requirements?.[index] && (
                  <p className="text-sm text-red-500">
                    {errors.requirements[index]?.message}
                  </p>
                )}
              </div>

              {requirementFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRequirement(index)}
                  className="shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Qualifications */}
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#0F1729]">
              Qualifications
            </h2>

            <p className="mt-1 text-sm text-[#676F7E]">
              Add the qualifications preferred for this role.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => appendQualification({ value: "" })}
          >
            <Plus />
            Add
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          {qualificationFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="A strong portfolio of shipped web projects."
                  {...register(`qualifications.${index}.value`)}
                />

                {errors.qualifications?.[index] && (
                  <p className="text-sm text-red-500">
                    {errors.qualifications[index]?.message}
                  </p>
                )}
              </div>

              {qualificationFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQualification(index)}
                  className="shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
        >
          {job ? "Update Job" : "Save Job"}
        </Button>
      </div>
    </form>
  );
}