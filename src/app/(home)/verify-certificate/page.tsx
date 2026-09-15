"use client";

import { useState } from "react";
import { Award, CheckCircle2, XCircle, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
export type CertificateVerificationResult = {
  isValid: boolean;
  certificateNumber?: string;
  certificateId?: string;
  studentName?: string;
  recipientName?: string;
  courseName?: string;
  issueDate?: string;
  error?: string;
};

async function verifyCertificate(id: string): Promise<{ success: boolean; data?: CertificateVerificationResult; error?: string }> {
  return {
    success: true,
    data: {
      isValid: false,
      error: "Certificate record not found."
    }
  };
}

import CTA from "@/components/homePage/Cta";

export default function VerifyCertificatePage() {
  const [certIdInput, setCertIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<CertificateVerificationResult | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certIdInput.trim()) return;

    setLoading(true);
    setSearched(false);
    setResult(null);

    const res = await verifyCertificate(certIdInput);
    setLoading(false);
    setSearched(true);

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setResult(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Header / Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#072069]/5 via-white to-transparent py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
              Authentication & Security
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0F1729] sm:text-5xl">
              Verify <span className="text-[#072069]">Certificate</span>
            </h1>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
            <p className="mt-5 text-base leading-7 text-[#676F7E]">
              Authenticate LeafClutch training and course completion certificates using your unique Certificate ID.
            </p>
          </div>

          {/* Form Card */}
          <div className="mx-auto mt-10 max-w-xl">
            <Card className="border-[#DADEE7] bg-white shadow-xl shadow-[#072069]/5">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-bold text-[#0F1729]">
                  Verify Certificate
                </CardTitle>
                <CardDescription className="text-sm text-[#676F7E]">
                  Enter your certificate ID
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Certificate ID (e.g. LC-2026-8941)"
                      value={certIdInput}
                      onChange={(e) => setCertIdInput(e.target.value)}
                      className="h-12 pl-10 text-base"
                    />
                    <Award className="absolute left-3 top-3.5 h-5 w-5 text-[#676F7E]" />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !certIdInput.trim()}
                    size="lg"
                    className="w-full bg-[#072069] text-white hover:bg-[#0EA5E9] transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Verify Certificate
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Display */}
            {searched && (
              <div className="mt-8 transition-all duration-300">
                {result ? (
                  /* VALID STATE */
                  <Card className="border-emerald-200 bg-emerald-50/50 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-emerald-700">
                        <CheckCircle2 className="h-6 w-6 shrink-0" />
                        <div>
                          <span className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                            Certificate Verified
                          </span>
                          <h3 className="mt-1 text-lg font-bold text-emerald-950">
                            Valid Certificate
                          </h3>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3 border-t border-emerald-200/60 pt-4 text-sm">
                        <div className="flex justify-between py-1 border-b border-emerald-100">
                          <span className="font-medium text-slate-600">Name</span>
                          <span className="font-semibold text-slate-900">{result.recipientName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-emerald-100">
                          <span className="font-medium text-slate-600">Course</span>
                          <span className="font-semibold text-slate-900">{result.courseName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-emerald-100">
                          <span className="font-medium text-slate-600">Issue Date</span>
                          <span className="font-semibold text-slate-900">{result.issueDate}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="font-medium text-slate-600">Certificate ID</span>
                          <span className="font-semibold text-slate-900">{result.certificateId}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  /* INVALID STATE */
                  <Card className="border-rose-200 bg-rose-50/50 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 text-rose-700">
                        <XCircle className="h-6 w-6 shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-bold text-rose-950">
                            Certificate Not Found
                          </h3>
                          <p className="mt-1 text-sm text-rose-800 leading-relaxed">
                            The certificate ID could not be verified. Please check the certificate ID and try again.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reused Existing CTA */}
      <CTA />
    </main>
  );
}
