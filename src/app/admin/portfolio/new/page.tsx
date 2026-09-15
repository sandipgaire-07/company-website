import PortfolioForm from "@/components/admin/portfolio/PortfolioForm";

export const metadata = {
  title: "Add Portfolio Project | Admin Panel",
  description: "Create a new portfolio showcase project.",
};

export default function NewPortfolioPage() {
  return (
    <div>
      <PortfolioForm />
    </div>
  );
}
