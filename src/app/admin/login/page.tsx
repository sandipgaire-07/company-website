"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginValues) {
    console.log(values);
    // Supabase authentication will be added later.
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-[#676F7E] transition-colors hover:text-[#072069]"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to website
          </Link>

          <div className="mt-8">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#072069] to-[#0EA5E9] text-lg font-bold text-white shadow-lg">
              L
            </div>

            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
              Admin Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0F1729]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#676F7E]">
              Sign in to manage your website.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-[#DADEE7] bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#0F1729]"
              >
                Email:
              </label>

              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#0F1729]"
              >
                Password:
              </label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-10"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#676F7E] transition-colors hover:text-[#072069]"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login */}
            <Button
              type="submit"
              className="h-auto w-full rounded-md bg-[#072069] py-3 text-white shadow-md shadow-[#0EA5E9]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}