import {
  Blocks, ChartNoAxesCombined, Compass, Gauge, Layers3, Lightbulb,
  Megaphone, MonitorSmartphone, Palette, Scaling, SearchCheck, Settings2,
  Share2, ShieldCheck, Smartphone, Sparkles, Workflow, Zap,
  Target,
} from "lucide-react";
import type { CSSProperties } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ServiceFeature } from "@/types/service";

const iconMap = {
  Blocks, ChartNoAxesCombined, Compass, Gauge, Layers3, Lightbulb, Megaphone,
  MonitorSmartphone, Palette, Scaling, SearchCheck, Settings2, Share2,
  ShieldCheck, Smartphone, Sparkles, Target, Workflow, Zap,
};

export default function ServiceFeatures({ features, color }: { features: ServiceFeature[]; color: string }) {
  const sortedFeatures = [...features].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">What We Offer</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">Powerful Capabilities Built Around Your Needs</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <Card key={feature.id} className="group relative min-h-[230px] overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="relative p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15`, color }}>
                      <Icon className="size-5" />
                    </div>
                    <span className="text-sm font-semibold text-[#DADEE7]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-7 text-lg font-bold text-[#0F1729]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#676F7E]">{feature.description}</p>
                  <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundColor: color }} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
