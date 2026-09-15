"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pencil,
  ExternalLink,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import DeleteTeamMemberDialog from "./DeleteTeamMemberDialog";

import type { TeamMember } from "@/types/team";

type TeamMemberListProps = {
  teamMembers: TeamMember[];
};


export default function TeamMemberList({
  teamMembers: initialMembers,
}: TeamMemberListProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  function handleToggleActive(id: string) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m))
    );
  }

  function handleDelete(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  if (members.length === 0) {
    return (
      <Card className="border-[#DADEE7] shadow-sm">
        <CardContent>
          <div className="rounded-xl border border-dashed border-[#DADEE7] py-12 text-center">
            <p className="text-sm text-[#676F7E]">
              No team members found. Click &ldquo;Add Team Member&rdquo; to
              create one.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Team Members
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="
                flex flex-col gap-4 rounded-xl
                border border-[#DADEE7] p-4
                transition
                hover:border-[#0EA5E9]/40
                hover:bg-[#F8FAFC]
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              {/* Member information */}
              <div className="flex items-start gap-4">
                <img
                  src={member.profileImage || "/testimonials/client-1.jpg"}
                  alt={member.name}
                  className="size-14 shrink-0 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0F1729]">
                      {member.name}
                    </h3>

                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        member.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="text-sm text-[#676F7E]">{member.position}</p>

                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-[#676F7E]">
                    {member.biography}
                  </p>

                  {/* Social links + sort order */}
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {member.socialLinks.map((link) => {
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#676F7E] transition-colors hover:text-[#072069]"
                          title={link.platform}
                        >
                          <ExternalLink className="size-3.5" />
                          {link.platform}
                        </a>
                      );
                    })}

                    <span className="rounded-full bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                      Order: {member.sortOrder}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={member.isActive}
                    onCheckedChange={() => handleToggleActive(member.id)}
                    aria-label={`Toggle ${member.name} active status`}
                  />
                </div>

                <Link
                  href={`/admin/team/${member.id}/edit`}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    border
                    border-[#DADEE7]
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-[#0F1729]
                    transition-colors
                    hover:bg-[#F8FAFC]
                    hover:text-[#072069]
                  "
                >
                  <Pencil className="size-4" />
                  Edit
                </Link>

                <DeleteTeamMemberDialog
                  memberName={member.name}
                  onConfirm={() => handleDelete(member.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
