import {
  ArrowUpRight,
  BarChart3,
  BellRing,
  BookOpenCheck,
  Building2,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  Clock3,
  CookingPot,
  ContactRound,
  CreditCard,
  FileChartColumn,
  FileCheck2,
  Fingerprint,
  FolderKanban,
  Kanban,
  Lightbulb,
  MonitorSmartphone,
  MessagesSquare,
  Package,
  Presentation,
  QrCode,
  ReceiptText,
  RefreshCw,
  ShoppingCart,
  ShieldCheck,
  Tags,
  TrendingUp,
  UserPlus,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import type { CSSProperties } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ProductFeature } from "@/types/productDetails";

const iconMap = {
  BarChart3,
  BellRing,
  BookOpenCheck,
  Building2,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  Clock3,
  CookingPot,
  ContactRound,
  CreditCard,
  FileChartColumn,
  FileCheck2,
  Fingerprint,
  FolderKanban,
  Kanban,
  Lightbulb,
  MonitorSmartphone,
  MessagesSquare,
  Package,
  Presentation,
  QrCode,
  ReceiptText,
  RefreshCw,
  ShoppingCart,
  ShieldCheck,
  Tags,
  TrendingUp,
  UserPlus,
  Users,
  WalletCards,
  Zap,
};

export default function ProductFeatures({
  features,
  color,
}: {
  features: ProductFeature[];
  color: string;
}) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF0FA] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#072069]">
            <Zap className="size-3.5 text-[#0EA5E9]" />
            Built for better work
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            Powerful Features,
            <span className="block text-[#072069]">
              Designed for Simplicity.
            </span>
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 text-base leading-7 text-[#676F7E] sm:text-lg">
            Everything you need to simplify operations, work more efficiently,
            and help your business move forward.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon =
              iconMap[feature.icon as keyof typeof iconMap];

            return (
              <Card
                key={feature.id}
                className="group relative overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <CardContent className="relative p-6 sm:p-7">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    {/* Icon */}
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl transition-all duration-300"
                        style={{ backgroundColor: `${color}20` }}
                      />

                      <div
                        className="relative flex size-12 items-center justify-center rounded-2xl text-[var(--product-color)]"
                        style={
                          {
                            "--product-color": color,
                            backgroundColor: `${color}15`,
                          } as CSSProperties
                        }
                      >
                        <Icon className="size-5" />
                      </div>
                    </div>

                    {/* Feature number */}
                    <span className="text-sm font-semibold text-[#DADEE7] transition-colors duration-300 group-hover:text-[#0EA5E9]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-7">
                    <h3 className="text-lg font-bold text-[#0F1729] transition-colors duration-300 group-hover:text-[#072069]">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#676F7E]">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="h-px flex-1 bg-[#DADEE7]" />

                    <ArrowUpRight className="ml-4 size-4 text-[#DADEE7] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color }} />
                  </div>
                   <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundColor: color }} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}