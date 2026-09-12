import CompanyDetailsPage from "@/components/admin/company/CompanyDetailsPage";

export default function CompanyDetailsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Company Details
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Manage your company information and social links.
        </p>
      </div>

      <CompanyDetailsPage />
    </div>
  );
}