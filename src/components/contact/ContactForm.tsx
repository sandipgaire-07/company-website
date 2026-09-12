
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

  function onSubmit(values: ContactFormValues) {
    const message = [
      "New contact enquiry",
      "",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Subject: ${values.subject}`,
      "",
      "Message:",
      values.message,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    reset();
  }

  return (
    <div className="rounded-3xl border border-[#DADEE7] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-[#0F1729]">
        Send us a message
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#676F7E]">
        Fill out the form and we&apos;ll get back to you soon.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
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
          className="mt-7 w-full p-6 bg-[#072069] text-white shadow-md shadow-[#0EA5E9]/15 hover:-translate-y-0.5 hover:opacity-95"
        >
          Send via WhatsApp
        </Button>
      </form>
    </div>
  );
}
