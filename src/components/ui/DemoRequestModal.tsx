"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Loader2, Send, Sparkles } from "lucide-react";
import { submitDemoRequest } from "@/actions/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type DemoRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
};

export default function DemoRequestModal({
  isOpen,
  onClose,
  defaultProduct = "ApexFlow Solution",
}: DemoRequestModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState(defaultProduct);
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await submitDemoRequest({
        full_name: fullName,
        email,
        phone,
        company_name: companyName,
        product_name: productName,
        message,
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        setErrorMsg(res.error || "Failed to submit demo request.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setIsSubmitted(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setMessage("");
    setErrorMsg(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Demo Requested!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you <span className="font-semibold text-slate-900">{fullName}</span>! Our product specialist will get in touch with you shortly to schedule your personalized demo of <span className="font-semibold text-slate-900">{productName}</span>.
            </p>
            <div className="pt-4">
              <Button
                onClick={handleReset}
                className="bg-[#072069] text-white px-8 py-3 rounded-xl hover:bg-[#072069]/90"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#0EA5E9] font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="h-4 w-4" /> Live Product Demonstration
            </div>
            <h3 className="text-2xl font-bold text-[#0F1729]">
              Request a Personalized Demo
            </h3>
            <p className="mt-1 text-sm text-[#676F7E]">
              See how our software can streamline your business workflows.
            </p>

            {errorMsg && (
              <div className="mt-4 p-3 text-sm rounded-xl bg-red-50 text-red-600 border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F1729] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1729] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1729] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+977..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1729] mb-1">
                    Company Name
                  </label>
                  <Input
                    placeholder="Acme Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1729] mb-1">
                    Product Interest
                  </label>
                  <Input
                    placeholder="Product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F1729] mb-1">
                  Specific Requirements or Questions
                </label>
                <Textarea
                  rows={3}
                  placeholder="Tell us about your team size, goals, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-6 bg-[#072069] text-white hover:bg-[#072069]/90 rounded-xl font-medium shadow-md shadow-[#0EA5E9]/15"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Demo Request
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
