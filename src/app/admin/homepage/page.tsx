import HomepageSectionList from "@/components/admin/homepage/HomepageSectionList";

export const metadata = {
  title: "Homepage Management | Admin Panel",
  description: "Manage homepage sections, display order, titles, descriptions, and visibility.",
};

export default function HomepageAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Homepage Management
        </h1>
        <p className="mt-1 text-sm text-[#676F7E]">
          Configure homepage section visibility, titles, descriptions, images, and sort order.
        </p>
      </div>

      <HomepageSectionList />
    </div>
  );
}
