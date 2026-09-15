import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Star } from "lucide-react";
import { portfolioItems } from "@/data/portfolio";
import { PortfolioItem } from "@/types/portfolio";
import CTA from "@/components/homePage/Cta";

export const metadata = {
  title: "Our Work & Portfolio | LeafClutch",
  description: "Explore our portfolio of successful projects, enterprise implementations, and digital transformation solutions.",
};

export default function PortfolioPage() {
  // Only show published projects, ordered by sortOrder
  const items: PortfolioItem[] = portfolioItems
    .filter((item) => item.isPublished)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Page Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#072069]/5 via-white to-transparent py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
              Our Work
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0F1729] sm:text-5xl lg:text-6xl">
              Featured Projects & <span className="text-[#072069]">Case Studies</span>
            </h1>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
            <p className="mt-6 text-lg leading-8 text-[#676F7E]">
              Take a look at some of the key platforms, mobile apps, and enterprise software solutions we have engineered for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-[#DADEE7] bg-white p-12 text-center">
            <p className="text-lg font-medium text-[#676F7E]">
              No portfolio projects available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#DADEE7] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#072069]/5"
              >
                {/* Project Image */}
                <div className="relative h-64 w-full overflow-hidden bg-[#F8FAFC]">
                  <Image
                    src={item.projectImage || "/showcase/hospitality.webp"}
                    alt={item.projectName}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#072069] backdrop-blur-md">
                      {item.category}
                    </span>
                    {item.isFeatured && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        <Star className="size-3 fill-white" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-xl font-bold text-[#0F1729] transition-colors group-hover:text-[#072069]">
                        <Link href={`/portfolio/${item.slug}`}>
                          {item.projectName}
                        </Link>
                      </h2>
                    </div>
                    <p className="mt-1 text-xs font-medium text-[#0EA5E9]">
                      Client: {item.client}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#676F7E]">
                      {item.description}
                    </p>

                    {/* Technologies Tags */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="rounded-md bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project & Case Study Links */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#DADEE7]/60 pt-4">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#072069] transition-colors hover:text-[#0EA5E9]"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    {item.projectUrl && (
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#676F7E] transition-colors hover:text-[#072069]"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reused Existing CTA */}
      <CTA />
    </main>
  );
}
