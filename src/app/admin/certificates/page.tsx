import CertificateList from "@/components/admin/certificates/CertificateList";

export const metadata = {
  title: "Certificate Management | Admin Panel",
  description: "Manage and organize issued certificates.",
};

export default function CertificatesAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Certificate Management
        </h1>
        <p className="mt-1 text-sm text-[#676F7E]">
          Manage and organize issued certificates.
        </p>
      </div>

      <CertificateList />
    </div>
  );
}
