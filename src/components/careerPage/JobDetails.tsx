import { CalendarDays, MapPin } from "lucide-react";

import type { Job } from "@/types/job";
import JobApplicationForm from "@/components/careerPage/JobApplicationForm";

export default function JobDetails({ job }: { job: Job }) {
  return (
    <main>
      <section className="px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Career opportunity
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0F1729] sm:text-5xl">
            {job.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#676F7E] sm:text-lg">
            {job.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 text-sm text-[#676F7E] sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-[#072069]" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-[#072069]" />
              Apply by {job.applicationDeadline}
            </span>
          </div>
          <div className="mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-16">
          <article className="rounded-3xl border border-[#DADEE7] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#0F1729]">Job Description</h2>
            <JobSection title="The role" items={[job.description]} paragraphs />
            <JobSection title="Responsibilities" items={job.responsibilities} />
            <JobSection title="Requirements" items={job.requirements} />
            <JobSection title="Qualifications" items={job.qualifications} />
          </article>
          <JobApplicationForm jobTitle={job.title} />
        </div>
      </section>
    </main>
  );
}

function JobSection({
  title,
  items,
  paragraphs = false,
}: {
  title: string;
  items: string[];
  paragraphs?: boolean;
}) {
  return (
    <section className="mt-8 first:mt-6">
      <h3 className="text-lg font-semibold text-[#072069]">{title}</h3>
      {paragraphs ? (
        <p className="mt-3 text-sm leading-7 text-[#676F7E]">{items[0]}</p>
      ) : (
        <ul className="mt-3 space-y-3 text-sm leading-6 text-[#676F7E]">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0EA5E9]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
