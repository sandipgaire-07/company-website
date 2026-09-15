import { notFound } from "next/navigation";
import { initialCertificates } from "@/data/certificates";
import CertificateForm from "@/components/admin/certificates/CertificateForm";

export const metadata = {
  title: "Edit Certificate | Admin Panel",
};

type EditCertificatePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCertificatePage({ params }: EditCertificatePageProps) {
  const { id } = await params;
  
  const certificate = initialCertificates.find((c) => c.id === id || c.certificateId === id);

  if (!certificate) {
    // If not found in static list (e.g. newly created mock item), fallback with id
    return (
      <CertificateForm
        initialData={{
          id,
          certificateId: id,
          recipientName: "John Doe",
          courseName: "Web Development",
          issueDate: new Date().toISOString().split("T")[0],
          status: "active",
        }}
      />
    );
  }

  return <CertificateForm initialData={certificate} />;
}
