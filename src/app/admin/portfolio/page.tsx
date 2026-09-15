import PortfolioList from "@/components/admin/portfolio/PortfolioList";

export const metadata = {
  title: "Portfolio Management | Admin Panel",
  description: "Manage portfolio showcase projects and case studies.",
};

export default function PortfolioAdminPage() {
  return (
    <div className="space-y-6">
      <PortfolioList />
    </div>
  );
}
