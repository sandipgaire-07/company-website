import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Star, CheckCircle } from "lucide-react";
import { portfolioItems } from "@/data/portfolio";
import CTA from "@/components/homePage/Cta";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = portfolioItems.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found | LeafClutch" };

  return {
    title: `${project.projectName} | Portfolio | LeafClutch`,
    description: project.description,
  };
}

export default async function PortfolioSlugPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = portfolioItems.find((p) => p.slug === slug && p.isPublished);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#072069]/10 via-white to-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#072069] hover:text-[#0EA5E9] transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-[#EBF0FA] px-3.5 py-1 text-xs font-semibold text-[#072069]">
              {project.category}
            </span>
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                <Star className="size-3 fill-amber-500 text-amber-500" /> Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            {project.projectName}
          </h1>

          <p className="mt-4 text-lg text-[#676F7E] leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Quick Meta */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-[#DADEE7] bg-white p-4 sm:p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#072069]/5 text-[#072069]">
                <User className="size-5" />
              </div>
              <div>
                <p className="text-xs text-[#676F7E]">Client</p>
                <p className="text-sm font-bold text-[#0F1729]">{project.client}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#072069]/5 text-[#072069]">
                <Tag className="size-5" />
              </div>
              <div>
                <p className="text-xs text-[#676F7E]">Category</p>
                <p className="text-sm font-bold text-[#0F1729]">{project.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#072069]/5 text-[#072069]">
                <Calendar className="size-5" />
              </div>
              <div>
                <p className="text-xs text-[#676F7E]">Completed</p>
                <p className="text-sm font-bold text-[#0F1729]">{project.completionDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#072069]/5 text-[#072069]">
                <CheckCircle className="size-5" />
              </div>
              <div>
                <p className="text-xs text-[#676F7E]">Status</p>
                <p className="text-sm font-bold text-emerald-700">Live & Deployed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Showcase */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-2 mb-12">
        <div className="relative h-[320px] sm:h-[450px] w-full overflow-hidden rounded-2xl border border-[#DADEE7] bg-[#F8FAFC] shadow-lg">
          <Image
            src={project.projectImage || "/showcase/hospitality.webp"}
            alt={project.projectName}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Content & Gallery Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Case Study Text */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl border border-[#DADEE7] bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-2xl font-bold text-[#0F1729] mb-4 pb-3 border-b border-[#DADEE7]/60">
                Case Study Overview
              </h2>
              <div className="prose prose-slate max-w-none text-[#0F1729] leading-relaxed whitespace-pre-line">
                {project.caseStudy}
              </div>
            </div>

            {/* Gallery Images if available */}
            {project.imageGallery && project.imageGallery.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#0F1729]">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.imageGallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-48 w-full overflow-hidden rounded-xl border border-[#DADEE7] bg-[#F8FAFC]"
                    >
                      <Image
                        src={img || "/showcase/hospitality.webp"}
                        alt={`${project.projectName} Gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-xs">
              <h3 className="text-lg font-bold text-[#0F1729] mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-[#EBF0FA] px-3 py-1.5 text-xs font-semibold text-[#072069]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Link Button */}
            {project.projectUrl && (
              <div className="rounded-2xl border border-[#DADEE7] bg-[#072069] p-6 text-white text-center shadow-xs">
                <h3 className="text-lg font-bold mb-2">Interested in Live Product?</h3>
                <p className="text-xs text-white/80 mb-4">
                  Experience the live implementation directly in production.
                </p>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#0EA5E9] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0EA5E9]/90"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="size-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </main>
  );
}
