"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";

import { Certificate, CertificateStatus } from "@/types/certificate";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const certificateSchema = z.object({
  certificateId: z.string().trim().min(1, "Certificate ID is required"),
  recipientName: z.string().trim().min(1, "Recipient Name is required"),
  courseName: z.string().trim().min(1, "Course Name is required"),
  issueDate: z.string().trim().min(1, "Issue Date is required"),
  expiryDate: z.string().optional(),
  description: z.string().optional(),
  certificateUrl: z.string().optional(),
  status: z.enum(["active", "revoked"]),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;

type CertificateFormProps = {
  initialData?: Certificate;
};

export default function CertificateForm({ initialData }: CertificateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema) as any,
    defaultValues: initialData
      ? {
          certificateId: initialData.certificateId,
          recipientName: initialData.recipientName,
          courseName: initialData.courseName,
          issueDate: initialData.issueDate,
          expiryDate: initialData.expiryDate || "",
          description: initialData.description || "",
          certificateUrl: initialData.certificateUrl || "",
          status: initialData.status,
        }
      : {
          certificateId: `LC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          recipientName: "",
          courseName: "",
          issueDate: new Date().toISOString().split("T")[0],
          expiryDate: "",
          description: "",
          certificateUrl: "",
          status: "active",
        },
  });

  const currentStatus = watch("status");

  function handleGenerateId() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `LC-${new Date().getFullYear()}-${randomNum}`;
    setValue("certificateId", generatedId, { shouldValidate: true });
    toast.success(`Generated mock ID: ${generatedId}`);
  }

  async function onSubmit(values: CertificateFormValues) {
    setIsSubmitting(true);
    
    // Simulate brief save action for frontend state
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsSubmitting(false);

    if (isEditing) {
      toast.success(`Certificate ${values.certificateId} updated successfully`);
    } else {
      toast.success(`Certificate ${values.certificateId} created successfully`);
    }

    router.push("/admin/certificates");
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header & Back button */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          size="icon"
          render={<Link href="/admin/certificates" />}
          className="bg-[#072069] text-white hover:bg-[#072069]/90 shrink-0"
        >
          <ArrowLeft className="size-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            {isEditing ? "Edit Certificate" : "Create Certificate"}
          </h1>
          <p className="text-sm text-[#676F7E]">
            {isEditing
              ? `Update details for certificate ${initialData.certificateId}`
              : "Issue a new certificate record for a recipient."}
          </p>
        </div>
      </div>

      <Card className="border-[#DADEE7] shadow-sm">
        <CardHeader className="border-b border-[#DADEE7]/60 pb-5">
          <CardTitle className="text-lg font-bold text-[#0F1729]">
            Certificate Information
          </CardTitle>
          <CardDescription className="text-sm text-[#676F7E]">
            Fill out the details below. All fields marked with * are required.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Certificate ID */}
            <div className="space-y-2">
              <Label htmlFor="certificateId" className="text-sm font-semibold text-[#0F1729]">
                Certificate ID <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="certificateId"
                  placeholder="e.g. LC-2026-0001"
                  {...register("certificateId")}
                  className="font-mono border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateId}
                  className="border-[#DADEE7] shrink-0 hover:bg-[#F8FAFC] text-[#072069]"
                >
                  <Sparkles className="size-4 mr-1.5 text-[#0EA5E9]" />
                  Generate ID
                </Button>
              </div>
              {errors.certificateId && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.certificateId.message}
                </p>
              )}
            </div>

            {/* Recipient Name */}
            <div className="space-y-2">
              <Label htmlFor="recipientName" className="text-sm font-semibold text-[#0F1729]">
                Recipient Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="recipientName"
                placeholder="Full name of certificate recipient"
                {...register("recipientName")}
                className="border-[#DADEE7] focus:border-[#0EA5E9]"
              />
              {errors.recipientName && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.recipientName.message}
                </p>
              )}
            </div>

            {/* Course Name */}
            <div className="space-y-2">
              <Label htmlFor="courseName" className="text-sm font-semibold text-[#0F1729]">
                Course / Training Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="courseName"
                placeholder="Name of the course or certification"
                {...register("courseName")}
                className="border-[#DADEE7] focus:border-[#0EA5E9]"
              />
              {errors.courseName && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.courseName.message}
                </p>
              )}
            </div>

            {/* Issue Date & Expiry Date */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="issueDate" className="text-sm font-semibold text-[#0F1729]">
                  Issue Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="issueDate"
                  type="date"
                  {...register("issueDate")}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
                {errors.issueDate && (
                  <p className="text-xs text-red-600 font-medium">
                    {errors.issueDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-sm font-semibold text-[#0F1729]">
                  Expiry Date (Optional)
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  {...register("expiryDate")}
                  className="border-[#DADEE7] focus:border-[#0EA5E9]"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-[#0F1729]">
                Description / Notes (Optional)
              </Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Optional notes or certificate description..."
                {...register("description")}
                className="border-[#DADEE7] focus:border-[#0EA5E9]"
              />
            </div>

            {/* Certificate URL */}
            <div className="space-y-2">
              <Label htmlFor="certificateUrl" className="text-sm font-semibold text-[#0F1729]">
                Certificate URL / Verification Link (Optional)
              </Label>
              <Input
                id="certificateUrl"
                type="url"
                placeholder="https://leafclutch.com/verify/LC-2026-0001"
                {...register("certificateUrl")}
                className="border-[#DADEE7] focus:border-[#0EA5E9]"
              />
            </div>

            {/* Status Select */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-semibold text-[#0F1729]">
                Certificate Status
              </Label>
              <select
                id="status"
                {...register("status")}
                className="w-full h-9 rounded-lg border border-[#DADEE7] bg-white px-3 py-1.5 text-sm text-[#0F1729] outline-none focus:border-[#0EA5E9]"
              >
                <option value="active">Active</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DADEE7]/60">
              <Link href="/admin/certificates">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  className="border-[#DADEE7]"
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#072069] text-white hover:bg-[#072069]/90 min-w-[140px]"
              >
                <Save className="size-4 mr-1.5" />
                {isEditing ? "Save Changes" : "Create Certificate"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
