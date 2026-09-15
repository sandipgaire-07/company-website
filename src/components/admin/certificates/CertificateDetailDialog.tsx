"use client";

import { Certificate } from "@/types/certificate";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Award, Calendar, ExternalLink, User, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";

type CertificateDetailDialogProps = {
  certificate: Certificate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CertificateDetailDialog({
  certificate,
  open,
  onOpenChange,
}: CertificateDetailDialogProps) {
  if (!certificate) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-6 sm:max-w-md bg-white">
        <SheetHeader className="border-b border-[#DADEE7]/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#072069] to-[#0EA5E9] text-white">
              <Award className="size-5" />
            </div>
            <div>
              <SheetTitle className="text-lg font-bold text-[#0F1729]">
                Certificate Details
              </SheetTitle>
              <SheetDescription className="text-xs text-[#676F7E]">
                ID: {certificate.certificateId}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-5 text-sm">
          {/* Status Badge */}
          <div className="flex items-center justify-between rounded-xl border border-[#DADEE7] p-3 bg-[#F8FAFC]">
            <span className="text-xs font-semibold text-[#676F7E] uppercase tracking-wider">
              Status
            </span>
            {certificate.status === "active" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                <CheckCircle className="size-3.5" /> Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 border border-red-200">
                <AlertTriangle className="size-3.5" /> Revoked
              </span>
            )}
          </div>

          {/* Certificate ID */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#676F7E] uppercase tracking-wider">
              Certificate ID
            </p>
            <p className="font-mono font-bold text-[#072069] text-base">
              {certificate.certificateId}
            </p>
          </div>

          {/* Recipient Name */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#676F7E] uppercase tracking-wider flex items-center gap-1.5">
              <User className="size-3.5 text-[#0EA5E9]" /> Recipient Name
            </p>
            <p className="font-semibold text-[#0F1729] text-base">
              {certificate.recipientName}
            </p>
          </div>

          {/* Course Name */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#676F7E] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-[#0EA5E9]" /> Course / Training
            </p>
            <p className="font-medium text-[#0F1729]">
              {certificate.courseName}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-[#DADEE7] p-3 bg-white">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#676F7E] flex items-center gap-1">
                <Calendar className="size-3 text-[#0EA5E9]" /> Issue Date
              </p>
              <p className="font-medium text-[#0F1729]">
                {certificate.issueDate}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#676F7E] flex items-center gap-1">
                <Calendar className="size-3 text-[#676F7E]" /> Expiry Date
              </p>
              <p className="font-medium text-[#0F1729]">
                {certificate.expiryDate || "N/A (Lifetime)"}
              </p>
            </div>
          </div>

          {/* Description */}
          {certificate.description && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#676F7E] uppercase tracking-wider">
                Description / Notes
              </p>
              <p className="text-xs text-[#676F7E] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg border border-[#DADEE7]">
                {certificate.description}
              </p>
            </div>
          )}

          {/* Verification URL */}
          {certificate.certificateUrl && (
            <div className="space-y-1 pt-2">
              <p className="text-xs font-semibold text-[#676F7E] uppercase tracking-wider">
                Verification Link
              </p>
              <a
                href={certificate.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#0EA5E9] hover:underline break-all font-mono"
              >
                {certificate.certificateUrl} <ExternalLink className="size-3 shrink-0" />
              </a>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
