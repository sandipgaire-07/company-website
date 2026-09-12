
import Image from "next/image";
import {
  Award,
  CheckCircle,
  FolderKanban,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const achievements = [
  {
    value: "1.5+",
    title: "Years",
    description: "Influencing Landscapes",
    icon: Sparkles,
  },
  {
    value: "15+",
    title: "Projects",
    description: "Excellence Achieved",
    icon: FolderKanban,
  },
  {
    value: "26+",
    title: "Awards",
    description: "Innovation Wins",
    icon: Award,
  },
  {
    value: "99%",
    title: "Happy",
    description: "Client Satisfaction",
    icon: CheckCircle,
  },
];

export default function AchievementStory() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        
        {/* Left - Image */}
        <div className="relative flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5E9]/10 blur-3xl" />

          <Image
            src="/achievement-image.png"
            alt="LeafClutch achievements"
            width={600}
            height={500}
            className="h-auto w-full max-w-xl object-contain"
          />
        </div>

        {/* Right - Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Since 2024
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            The Tale of Our{" "}
            <span className="text-[#072069]">
              Achievement Story
            </span>
          </h2>

          <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#676F7E]">
            Our journey is a testament to teamwork and perseverance. Together,
            we&apos;ve overcome challenges and celebrated victories, creating a
            narrative of constant progress.
          </p>

          {/* Achievement Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <Card
                  key={achievement.title}
                  className="group border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#EBF0FA] text-[#072069] transition-colors duration-300 group-hover:bg-[#072069] group-hover:text-white">
                      <Icon className="size-5" />
                    </div>

                    <p className="mt-4 text-2xl font-bold text-[#072069] sm:text-3xl">
                      {achievement.value}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#0F1729]">
                      {achievement.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#676F7E] sm:text-sm">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
