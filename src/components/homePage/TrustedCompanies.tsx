"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { companies as staticCompanies } from "@/data/companies";
import { getSiteContent } from "@/actions/content";
import { Marquee } from "@/components/ui/marquee";

export default function TrustedCompanies() {
  const [companyList, setCompanyList] = useState(staticCompanies);

  useEffect(() => {
    async function loadCompanies() {
      const res = await getSiteContent();
      if (res.success && res.data && res.data.companies && res.data.companies.length > 0) {
        const mapped = res.data.companies.map((c: any) => ({
          id: c.id,
          name: c.name,
          logo: c.logo || c.logo_url || "/companies/company-one.svg",
        }));
        setCompanyList(mapped);
      }
    }
    loadCompanies();
  }, []);

  return (
    <section className="border-y border-[#DADEE7] bg-[#F8FAFC] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#676F7E]">
            Trusted by businesses
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0F1729] sm:text-3xl">
            Companies that trust our solutions
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

        </div>

        {/* Marquee */}
        <div className="relative mt-10 overflow-hidden">

          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent sm:w-24" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent sm:w-24" />

          <Marquee
            pauseOnHover
          >
            {companyList.map((company) => (
              <div
                key={company.id}
                className="group/logo flex h-16 w-36 shrink-0 items-center justify-center sm:w-44"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={160}
                  height={64}
                  className="h-10 w-auto max-w-[140px] object-contain grayscale opacity-60 transition-all duration-300 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 sm:h-12 sm:max-w-[160px]"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}