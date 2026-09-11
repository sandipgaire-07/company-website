
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  resumeUrl: z.string().trim().url("Please enter a valid resume URL."),
  coverMessage: z
    .string()
    .trim()
    .min(20, "Please enter at least 20 characters."),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

type JobApplicationFormProps = {
  jobTitle: string;
};

export default function JobApplicationForm({
  jobTitle,
}: JobApplicationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      resumeUrl: "",
      coverMessage: "",
    },
  });

  function onSubmit(values: ApplicationValues) {
    const application = {
      jobTitle,
      ...values,
    };

    console.log(application);

    reset();
  }

  return (
    <div className="rounded-3xl border border-[#DADEE7] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-[#0F1729]">
        Apply for this role
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#676F7E]">
        Share a few details and our team will review your application.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-[#0F1729]"
            >
              Full Name
            </label>

            <Input
              id="fullName"
              placeholder="Your full name"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />

            {errors.fullName && (
              <p className="text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#0F1729]"
            >
              Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-[#0F1729]"
            >
              Phone
            </label>

            <Input
              id="phone"
              type="tel"
              placeholder="+977..."
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />

            {errors.phone && (
              <p className="text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Resume URL */}
          <div className="space-y-2">
            <label
              htmlFor="resumeUrl"
              className="text-sm font-medium text-[#0F1729]"
            >
              Resume/CV URL
            </label>

            <Input
              id="resumeUrl"
              type="url"
              placeholder="https://..."
              aria-invalid={Boolean(errors.resumeUrl)}
              {...register("resumeUrl")}
            />

            {errors.resumeUrl && (
              <p className="text-sm text-red-500">
                {errors.resumeUrl.message}
              </p>
            )}
          </div>
        </div>

        {/* Cover Message */}
        <div className="space-y-2">
          <label
            htmlFor="coverMessage"
            className="text-sm font-medium text-[#0F1729]"
          >
            Cover Message
          </label>

          <Textarea
            id="coverMessage"
            rows={6}
            placeholder="Tell us why this role is a good fit for you..."
            aria-invalid={Boolean(errors.coverMessage)}
            {...register("coverMessage")}
          />

          {errors.coverMessage && (
            <p className="text-sm text-red-500">
              {errors.coverMessage.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="h-auto w-full bg-[#072069] p-4 text-white shadow-md shadow-[#0EA5E9]/15 hover:-translate-y-0.5 hover:opacity-95"
        >
          Submit Application
        </Button>
      </form>
    </div>
  );
}

