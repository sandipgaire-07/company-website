"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Ban,
  Trash2,
  Award,
  CheckCircle,
  AlertTriangle,
  Eye,
} from "lucide-react";

import { Certificate } from "@/types/certificate";
import { initialCertificates } from "@/data/certificates";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteCertificateDialog from "./DeleteCertificateDialog";
import RevokeCertificateDialog from "./RevokeCertificateDialog";
import CertificateDetailDialog from "./CertificateDetailDialog";

export default function CertificateList() {
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<Certificate | null>(null);
  const [detailTarget, setDetailTarget] = useState<Certificate | null>(null);

  // Search filter
  const filteredCertificates = certificates.filter((cert) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      cert.certificateId.toLowerCase().includes(query) ||
      cert.recipientName.toLowerCase().includes(query) ||
      cert.courseName.toLowerCase().includes(query)
    );
  });

  // Action handlers (Local UI state)
  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setCertificates((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function handleRevokeConfirm() {
    if (!revokeTarget) return;
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === revokeTarget.id ? { ...c, status: "revoked" } : c
      )
    );
    setRevokeTarget(null);
  }

  return (
    <div className="space-y-6">
      {/* Search & Create Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#676F7E]" />
          <Input
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-[#DADEE7] focus:border-[#0EA5E9]"
          />
        </div>


        <Link href="/admin/certificates/new" className="bg-[#072069] text-white hover:bg-[#072069]/90 shrink-0">
          <Plus className="size-4 mr-1.5" />
          Create Certificate
        </Link>



      </div>

      {/* Certificate Table Card */}
      <Card className="border-[#DADEE7] shadow-sm overflow-hidden">
        <CardHeader className="border-b border-[#DADEE7]/60 pb-4">
          <CardTitle className="text-xl font-bold text-[#0F1729]">
            Issued Certificates ({filteredCertificates.length})
          </CardTitle>
          <CardDescription className="text-sm text-[#676F7E]">
            All certificates generated and managed in the system.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {filteredCertificates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#F8FAFC] border border-[#DADEE7] text-[#676F7E] mb-4">
                <Award className="size-7" />
              </div>
              {searchQuery ? (
                <>
                  <h3 className="text-base font-semibold text-[#0F1729]">
                    No certificates match your search
                  </h3>
                  <p className="text-sm text-[#676F7E] mt-1 max-w-sm">
                    No results found for &quot;{searchQuery}&quot;. Try adjusting your search query.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 border-[#DADEE7]"
                  >
                    Clear Search
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-base font-semibold text-[#0F1729]">
                    No certificates found
                  </h3>
                  <p className="text-sm text-[#676F7E] mt-1 max-w-sm">
                    Create your first certificate to get started.
                  </p>
                  <Button
                    render={
                      <Link href="/admin/certificates/new">
                        <Plus className="size-4 mr-1.5" />
                        Create Certificate
                      </Link>
                    }
                    className="mt-4 bg-[#072069] text-white hover:bg-[#072069]/90"
                  />
                </>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#DADEE7] text-xs font-semibold uppercase text-[#676F7E] tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">Certificate ID</th>
                    <th scope="col" className="px-6 py-3.5">Recipient</th>
                    <th scope="col" className="px-6 py-3.5">Course</th>
                    <th scope="col" className="px-6 py-3.5">Issue Date</th>
                    <th scope="col" className="px-6 py-3.5">Status</th>
                    <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DADEE7]/60 bg-white">
                  {filteredCertificates.map((cert) => (
                    <tr
                      key={cert.id}
                      className="hover:bg-[#F8FAFC]/80 transition-colors"
                    >
                      {/* Certificate ID */}
                      <td className="px-6 py-4 font-mono font-bold text-[#072069] whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setDetailTarget(cert)}
                          className="hover:underline flex items-center gap-1.5 text-[#072069]"
                        >
                          {cert.certificateId}
                          <Eye className="size-3.5 text-[#0EA5E9] opacity-70" />
                        </button>
                      </td>

                      {/* Recipient */}
                      <td className="px-6 py-4 font-semibold text-[#0F1729] whitespace-nowrap">
                        {cert.recipientName}
                      </td>

                      {/* Course */}
                      <td className="px-6 py-4 text-[#676F7E] max-w-xs truncate">
                        {cert.courseName}
                      </td>

                      {/* Issue Date */}
                      <td className="px-6 py-4 text-[#676F7E] whitespace-nowrap">
                        {cert.issueDate}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cert.status === "active" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                            <CheckCircle className="size-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                            <AlertTriangle className="size-3" /> Revoked
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="text-[#676F7E] hover:text-[#0F1729]"
                              >
                                <MoreVertical className="size-4" />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              render={
                                <Link href={`/admin/certificates/${cert.id}/edit`}>
                                  <Pencil className="size-4 mr-2 text-[#0EA5E9]" />
                                  Edit
                                </Link>
                              }
                            />
                            {cert.status === "active" && (
                              <DropdownMenuItem
                                onClick={() => setRevokeTarget(cert)}
                                className="text-amber-700 hover:text-amber-800"
                              >
                                <Ban className="size-4 mr-2 text-amber-600" />
                                Revoke
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => setDeleteTarget(cert)}
                              variant="destructive"
                            >
                              <Trash2 className="size-4 mr-2 text-red-600" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      {deleteTarget && (
        <DeleteCertificateDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          certificateId={deleteTarget.certificateId}
          recipientName={deleteTarget.recipientName}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* Revoke Dialog */}
      {revokeTarget && (
        <RevokeCertificateDialog
          open={!!revokeTarget}
          onOpenChange={(open) => !open && setRevokeTarget(null)}
          certificateId={revokeTarget.certificateId}
          recipientName={revokeTarget.recipientName}
          onConfirm={handleRevokeConfirm}
        />
      )}

      {/* Detail Dialog */}
      {detailTarget && (
        <CertificateDetailDialog
          certificate={detailTarget}
          open={!!detailTarget}
          onOpenChange={(open) => !open && setDetailTarget(null)}
        />
      )}
    </div>
  );
}
