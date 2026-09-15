import { notFound } from "next/navigation";
import PortfolioForm from "@/components/admin/portfolio/PortfolioForm";
import { portfolioItems } from "@/data/portfolio";

export const metadata = {
  title: "Edit Portfolio Project | Admin Panel",
  description: "Update details for an existing portfolio project.",
};

type EditPortfolioPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const { id } = await params;
  const project = portfolioItems.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <PortfolioForm initialData={project} />
    </div>
  );
}
