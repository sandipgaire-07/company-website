import { Eye, Target } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { missionVision } from "@/data/missionVision";

const iconMap = {
  Target,
  Eye,
};

export default function MissionVision() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            What Drives Us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            Our Mission &{" "}
            <span className="text-[#072069]">Vision</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            The principles that guide how we build technology and create value
            for our clients.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {missionVision.map((item) => {
            const Icon =
              iconMap[item.icon as keyof typeof iconMap];

            return (
              <Card
                key={item.id}
                className="group border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-7 sm:p-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#EBF0FA] text-[#072069] transition-colors duration-300 group-hover:bg-[#072069] group-hover:text-white">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#0F1729]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#676F7E] sm:text-base">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}