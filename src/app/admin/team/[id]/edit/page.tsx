import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import TeamMemberForm from "@/components/admin/team/TeamMemberForm";
import { teamMembers } from "@/data/team";
import type { TeamMember } from "@/types/team";

type EditTeamMemberPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTeamMemberPage({
  params,
}: EditTeamMemberPageProps) {
  const { id } = await params;

  // TODO: Replace with API call when backend is connected
  const teamMember: TeamMember | undefined = teamMembers.find(
    (member) => member.id === id
  );

  if (!teamMember) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/team"
          className="
            inline-flex
            size-9
            items-center
            justify-center
            rounded-md
            bg-[#072069]
            text-white
            transition-colors
            hover:bg-[#072069]/90
          "
          aria-label="Back to team members"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Edit Team Member
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Update the information for{" "}
            <span className="font-medium">{teamMember.name}</span>.
          </p>
        </div>
      </div>

      <TeamMemberForm teamMember={teamMember} />
    </div>
  );
}
