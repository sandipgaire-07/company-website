import {
  Blocks,
  ChartNoAxesCombined,
  Compass,
  Gauge,
  Layers3,
  Lightbulb,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Scaling,
  SearchCheck,
  Settings2,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Workflow,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceFeature } from "@/types/service";

const iconMap = {
  Blocks,
  ChartNoAxesCombined,
  Compass,
  Gauge,
  Layers3,
  Lightbulb,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Scaling,
  SearchCheck,
  Settings2,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Workflow,
  Zap,
};

export default function ServiceFeatures({
  features,
  color,
}: {
  features: ServiceFeature[];
  color: string;
}) {
  const accentColor = color || "#0EA5E9";
  const sortedFeatures = [...(features || [])].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0EA5E9]">
            What We Offer
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
            Powerful Capabilities Built Around Your Needs
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Zap;
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <Card
                key={feature.id || index}
                className="group relative flex flex-col overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex size-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      <Icon className="size-6" />
                    </div>
                    <span className="text-sm font-bold tracking-wider text-[#DADEE7] group-hover:text-[#072069]/40 transition-colors">
                      {formattedIndex}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#0F1729]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#676F7E]">
                    {feature.description}
                  </p>

                  <div
                    className="absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: accentColor }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
