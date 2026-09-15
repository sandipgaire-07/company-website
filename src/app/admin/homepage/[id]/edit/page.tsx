import { notFound } from "next/navigation";
import { getHomepageSectionById } from "@/actions/homepageSection";
import HomepageSectionForm from "@/components/admin/homepage/HomepageSectionForm";

export const metadata = {
  title: "Edit Homepage Section | Admin Panel",
};

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditHomepageSectionPage({ params }: EditPageProps) {
  const { id } = await params;
  const res = await getHomepageSectionById(id);

  if (!res.success || !res.data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <HomepageSectionForm section={res.data} />
    </div>
  );
}
