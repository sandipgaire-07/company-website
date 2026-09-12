import { notFound } from "next/navigation";

import JobDetails from "@/components/careerPage/JobDetails";
import { jobs } from "@/data/jobs";
import { adminGetJobBySlug } from "@/actions/admin";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticJob = jobs.find((item) => item.slug === slug);
  const dbRes = await adminGetJobBySlug(slug);

  const job = dbRes.success && dbRes.data ? dbRes.data : staticJob;

  if (!job) {
    notFound();
  }

  return <JobDetails job={job} />;
}
