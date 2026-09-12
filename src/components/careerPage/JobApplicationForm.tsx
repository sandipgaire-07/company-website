"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitJobApplication } from "@/actions/content";

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
  jobId?: string;
};

export default function JobApplicationForm({
  jobTitle,
  jobId,
}: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
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

  async function onSubmit(values: ApplicationValues) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitJobApplication({
        job_id: jobId,
        job_title: jobTitle,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        resume_url: values.resumeUrl,
        cover_message: values.coverMessage,
      });

      if (res.success) {
        setIsSubmitted(true);
        reset();
      } else {
        setErrorMessage(res.error || "Failed to submit application. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[#DADEE7] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-[#0F1729]">
        Apply for {jobTitle}
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#676F7E]">
        Share your details and resume link. Our HR team will review your profile.
      </p>

      {isSubmitted ? (
        <div className="mt-6 rounded-2xl bg-emerald-50 p-6 border border-emerald-200 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-900">Application Submitted!</h3>
            <p className="mt-1 text-sm text-emerald-700">
              Thank you for applying. We have received your application for <span className="font-semibold">{jobTitle}</span> and will reach out if there is a match.
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="text-xs"
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {errorMessage && (
            <div className="p-3 text-sm rounded-lg bg-red-50 text-red-600 border border-red-200">
              {errorMessage}
            </div>
          )}

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
                Resume/CV (Upload file or paste link)
              </label>

              <div className="flex gap-2">
                <Input
                  id="resumeUrl"
                  type="url"
                  placeholder="https://... or upload file"
                  aria-invalid={Boolean(errors.resumeUrl)}
                  {...register("resumeUrl")}
                  className="flex-1"
                />

                <label
                  htmlFor="resume-file-upload"
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#DADEE7] bg-[#F8FAFC] px-3 text-xs font-medium text-[#072069] transition hover:bg-[#EBF0FA]"
                >
                  Upload File
                  <input
                    id="resume-file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append("file", file);
                      const { uploadImageAction } = await import("@/actions/upload");
                      const res = await uploadImageAction(formData);
                      if (res.success && res.data) {
                        setValue("resumeUrl", res.data);
                      } else {
                        alert(res.error || "Failed to upload file.");
                      }
                    }}
                  />
                </label>
              </div>

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
            disabled={isSubmitting}
            className="h-auto w-full bg-[#072069] p-4 text-white shadow-md shadow-[#0EA5E9]/15 hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
