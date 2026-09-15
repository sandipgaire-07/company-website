import Link from "next/link";
import { Plus } from "lucide-react";

import TeamMemberList from "@/components/admin/team/TeamMemberList";
import { teamMembers } from "@/data/team";

export default function TeamPage() {
  // Sort by sortOrder before rendering
  const sorted = [...teamMembers].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Team Members
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage your company&apos;s team members.
          </p>
        </div>

        <Link
          href="/admin/team/new"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-md
            bg-[#072069]
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition-colors
            hover:bg-[#072069]/90
          "
        >
          <Plus className="size-4" />
          Add Team Member
        </Link>
      </div>

      <TeamMemberList teamMembers={sorted} />
    </div>
  );
}
