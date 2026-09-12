"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Pencil, Loader2 } from "lucide-react";

import { adminGetAllJobs, adminDeleteJob } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteCareerDialog from "@/components/admin/careers/DeleteCareerDialog";

export default function CareerList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  async function loadJobs() {
    setLoading(true);
    const res = await adminGetAllJobs();
    if (res.success && res.data) {
      setJobs(res.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  function handleDelete(id: string, title: string) {
    startTransition(async () => {
      const res = await adminDeleteJob(id);
      if (res.success) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      } else {
        alert(`Failed to delete "${title}": ${res.error}`);
      }
    });
  }

  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Job Openings
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-6 animate-spin text-[#0EA5E9]" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#DADEE7] py-12 text-center">
            <p className="text-sm text-[#676F7E]">
              No job openings found. Click &ldquo;Add Job&rdquo; to create one.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col gap-4 rounded-xl border border-[#DADEE7] p-5 transition hover:border-[#0EA5E9]/40 hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Job information */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-[#0F1729]">
                      {job.title}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        job.isOpen
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {job.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>

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
                    <Pencil className="size-4" />
                    Edit
                  </Button>

                  <DeleteCareerDialog
                    jobTitle={job.title}
                    onConfirm={() => handleDelete(job.id, job.title)}
                    isPending={isPending}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}