import Link from "next/link";
import { CalendarDays, MapPin, Pencil } from "lucide-react";

import { jobs } from "@/data/jobs";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteCareerDialog from "@/components/admin/careers/DeleteCareerDialog";

export default function CareerList() {
  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          Current Openings
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="
                flex flex-col gap-4 rounded-xl
                border border-[#DADEE7] p-5
                transition
                hover:border-[#0EA5E9]/40
                hover:bg-[#F8FAFC]
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              {/* Job information */}
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-[#0F1729]">
                  {job.title}
                </h3>

                <p className="mt-1 line-clamp-2 max-w-2xl text-sm leading-6 text-[#676F7E]">
                  {job.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#676F7E]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4 text-[#0EA5E9]" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-[#0EA5E9]" />
                    Deadline: {job.applicationDeadline}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#DADEE7]"
                  render={
                    <Link href={`/admin/careers/${job.id}/edit`} />
                  }
                >
                  <Pencil />
                  Edit
                </Button>

                <DeleteCareerDialog jobTitle={job.title} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}