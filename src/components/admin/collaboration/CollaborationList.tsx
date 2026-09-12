import Link from "next/link";
import { Pencil } from "lucide-react";

import { companies } from "@/data/companies";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteCollaborationDialog from "./DeleteCollaborationDialog";

export default function CollaborationList() {
  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Collaborations
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="
                flex flex-col gap-4 rounded-xl
                border border-[#DADEE7] p-4
                transition
                hover:border-[#0EA5E9]/40
                hover:bg-[#F8FAFC]
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              {/* Collaboration information */}
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F8FAFC]">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="size-full object-contain p-2"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-[#0F1729]">
                    {company.name}
                  </h3>

                  <p className="text-sm text-[#676F7E]">
                    Partnership / Collaboration
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/collaborations/${company.id}/edit`}
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

                <DeleteCollaborationDialog
                  collaborationName={company.name}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}