"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/actions/content";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  subject: z.string().trim().min(3, "Please enter a subject."),
  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const whatsappNumber = "9779802627681";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitContactForm({
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message,
      });

      if (res.success) {
        setIsSubmitted(true);
        reset();
      } else {
        setErrorMessage(res.error || "Failed to save submission. Please try again.");
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
        Send us a message
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#676F7E]">
        Fill out the form and our team will get back to you promptly.
      </p>

      {isSubmitted ? (
        <div className="mt-6 rounded-2xl bg-emerald-50 p-6 border border-emerald-200 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-900">Message Received!</h3>
            <p className="mt-1 text-sm text-emerald-700">
              Thank you for reaching out. Your message has been saved in our system and our team will respond shortly.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="text-xs"
            >
              Send Another Message
            </Button>
            <Button
              variant="default"
              onClick={() => {
                window.open(`https://wa.me/${whatsappNumber}?text=Hi%20LeafClutch%20team`, "_blank");
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
            >
              Chat on WhatsApp Now
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
                placeholder="Your name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
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
                aria-invalid={!!errors.email}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
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
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-[#0F1729]"
              >
                Subject
              </label>

              <Input
                id="subject"
                placeholder="How can we help?"
                aria-invalid={!!errors.subject}
                {...register("subject")}
              />

              {errors.subject && (
                <p className="text-sm text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-[#0F1729]"
            >
              Message
            </label>

            <Textarea
              id="message"
              placeholder="Tell us about your project or question..."
              rows={6}
              aria-invalid={!!errors.message}
              {...register("message")}
            />

            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 w-full p-6 bg-[#072069] text-white shadow-md shadow-[#0EA5E9]/15 hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Message
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
