"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { stats as staticStats } from "@/data/stats";
import { getCompanyStats } from "@/actions/content";

export default function Stats() {
  const [statList, setStatList] = useState<any[]>(staticStats);

  useEffect(() => {
    async function loadStats() {
      const res = await getCompanyStats();
      if (res.success && res.data && res.data.length > 0) {
        const mapped = res.data.map((s: any) => ({
          id: s.id,
          value: s.value,
          label: s.label,
          description: s.description || "",
        }));
        setStatList(mapped);
      }
    }
    loadStats();
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Our Achievements
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            Numbers That Tell{" "}
            <span className="text-[#072069]">Our Story</span>
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            Our growth is reflected in the businesses we have helped,
            solutions we have delivered, and relationships we have built.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {statList.map((stat) => (
            <Card
              key={stat.id}
              className="border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6 text-center sm:p-8">
                <p className="text-3xl font-bold text-[#072069] sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm font-semibold text-[#0F1729] sm:text-base">
                  {stat.label}
                </p>

                {stat.description && (
                  <p className="mt-1 text-xs leading-5 text-[#676F7E] sm:text-sm">
                    {stat.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}