import { notFound } from "next/navigation";

import JobDetails from "@/components/careerPage/JobDetails";
import { jobs } from "@/data/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);

  if (!job) {
    notFound();
  }

  return <JobDetails job={job} />;
}
