import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

import { jobs } from "@/data/jobs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function JobOpenings() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
              Open positions
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
              Find your next opportunity
            </h2>
            <p className="text-sm leading-6 text-[#676F7E]">
            Explore roles where your ideas, skills, and perspective can help us
            build better products.
          </p>
          </div>
        
        </div>

        {jobs.length > 0 ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="group relative flex h-full flex-col overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardHeader className="p-6 pb-0 sm:p-7 sm:pb-0">
                  <CardTitle className="text-xl font-bold text-[#0F1729]">
                    {job.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="min-h-20 text-sm leading-6 text-[#676F7E]">
                    {job.description}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-[#DADEE7] pt-5">
                    <div className="flex items-center gap-2 text-sm text-[#676F7E]">
                      <MapPin className="size-4 shrink-0 text-[#072069]" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#676F7E]">
                      <CalendarDays className="size-4 shrink-0 text-[#072069]" />
                      <span>Apply by {job.applicationDeadline}</span>
                    </div>
                  </div>

                  <Button
                    render={
                      <Link href={`/career/${job.slug}`}>
                        View Details
                        <ArrowRight className="size-4" />
                      </Link>
                    }
                    nativeButton={false}
                    className="mt-7 w-full bg-[#072069] text-white shadow-md shadow-[#0EA5E9]/15 hover:-translate-y-0.5 hover:opacity-95"
                  />
                      <div className="absolute inset-x-0 bottom-4 h-1 bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </CardContent>
              </Card>
            ))}
          
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-[#DADEE7] bg-white px-6 py-12 text-center">
            <p className="text-[#676F7E]">
              There are no open positions at the moment. Please check back
              soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
