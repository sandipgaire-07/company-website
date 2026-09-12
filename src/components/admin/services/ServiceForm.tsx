"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { adminCreateService, adminUpdateService } from "@/actions/admin";

const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2, "Please enter the service title."),
  description: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters."),
  slug: z.string().trim().min(2, "Please enter the service slug."),
  animationUrl: z
    .string()
    .trim()
    .url("Please enter a valid animation URL."),
  color: z.string().trim().min(4, "Please enter a color."),
  features: z.array(
    z.object({
      title: z.string().trim().min(2, "Required."),
      description: z.string().trim().min(5, "Required."),
      icon: z.string().trim().min(1, "Required."),
    })
  ),
});

export type ServiceFormInput = z.input<typeof serviceSchema>;
export type ServiceFormValues = z.output<typeof serviceSchema>;

type ServiceFormProps = {
  service?: ServiceFormValues & { id?: string };
};

export default function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormInput, undefined, ServiceFormValues>({
    resolver: zodResolver(serviceSchema),

    defaultValues: service
      ? {
          id: service.id,
          title: service.title,
          description: service.description,
          slug: service.slug,
          animationUrl: service.animationUrl,
          color: service.color,
          features: service.features,
        }
      : {
          title: "",
          description: "",
          slug: "",
          animationUrl: "",
          color: "#0EA5E9",
          features: [
            {
              title: "",
              description: "",
              icon: "Zap",
            },
          ],
        },
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  async function onSubmit(values: ServiceFormValues) {
    setIsSubmitting(true);
    try {
      let result;
      if (service?.id) {
        result = await adminUpdateService(service.id, values);
      } else {
        result = await adminCreateService(values);
      }

      if (result.success) {
        toast.success(service ? "Service updated successfully!" : "Service created successfully!");
        router.push("/admin/services");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to save service.");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
  <div>
    <h2 className="text-xl font-semibold text-[#0F1729]">
      Basic Information
    </h2>

    <p className="mt-1 text-sm text-[#676F7E]">
      Add the main information for this service.
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
          Service Title
        </label>

        <Input
          id="title"
          placeholder="Web Development"
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
          placeholder="web-development"
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
        placeholder="Describe what this service provides..."
        {...register("description")}
      />

      {errors.description && (
        <p className="text-sm text-red-500">
          {errors.description.message}
        </p>
      )}
    </div>

    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2">
        <label
          htmlFor="animationUrl"
          className="text-sm font-medium text-[#0F1729]"
        >
          Animation URL
        </label>

        <Input
          id="animationUrl"
          placeholder="https://lottie.host/..."
          {...register("animationUrl")}
        />

        {errors.animationUrl && (
          <p className="text-sm text-red-500">
            {errors.animationUrl.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="color"
          className="text-sm font-medium text-[#0F1729]"
        >
          Service Color
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
  </div>
</section>

<section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
  <div className="flex items-center justify-between gap-4">
    <div>
      <h2 className="text-xl font-semibold text-[#0F1729]">
        Service Features
      </h2>

      <p className="mt-1 text-sm text-[#676F7E]">
        Add the key features of this service.
      </p>
    </div>

    <Button
      type="button"
      variant="outline"
      onClick={() =>
        appendFeature({
          title: "",
          description: "",
          icon: "Zap",
        })
      }
    >
      Add Feature
    </Button>
  </div>

  <Separator className="my-6" />

  <div className="space-y-6">
    {featureFields.map((field, index) => (
      <div
        key={field.id}
        className="rounded-xl border border-[#DADEE7] p-5"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-medium text-[#0F1729]">
            Feature {index + 1}
          </h3>

          {featureFields.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => removeFeature(index)}
            >
              <Trash className="hover:text-red-500"/>
            </Button>
          )}
        </div>

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor={`features.${index}.title`}
                className="text-sm font-medium text-[#0F1729]"
              >
                Feature Title
              </label>

              <Input
                id={`features.${index}.title`}
                placeholder="Responsive Design"
                {...register(`features.${index}.title`)}
              />

              {errors.features?.[index]?.title && (
                <p className="text-sm text-red-500">
                  {errors.features[index].title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`features.${index}.icon`}
                className="text-sm font-medium text-[#0F1729]"
              >
                Icon
              </label>

              <Input
                id={`features.${index}.icon`}
                placeholder="MonitorSmartphone"
                {...register(`features.${index}.icon`)}
              />

              {errors.features?.[index]?.icon && (
                <p className="text-sm text-red-500">
                  {errors.features[index].icon.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`features.${index}.description`}
              className="text-sm font-medium text-[#0F1729]"
            >
              Description
            </label>

            <Textarea
              id={`features.${index}.description`}
              rows={3}
              placeholder="Describe this feature..."
              {...register(`features.${index}.description`)}
            />

            {errors.features?.[index]?.description && (
              <p className="text-sm text-red-500">
                {errors.features[index].description.message}
              </p>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="bg-linear-to-r bg-[#072069] text-white hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : service
            ? "Update Service"
            : "Save Service"}
        </Button>
      </div>
    </form>
  );
}