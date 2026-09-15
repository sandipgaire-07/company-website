"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, ArrowUpDown, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { HomepageSection } from "@/types/homepageSection";
import { getHomepageSections, toggleHomepageSection } from "@/actions/homepageSection";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function HomepageSectionList() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function loadSections() {
    setLoading(true);
    setErrorMsg(null);

    const res = await getHomepageSections();

    if (res.success && res.data) {
      // Sort by sortOrder
      const sorted = [...res.data].sort((a, b) => a.sortOrder - b.sortOrder);
      setSections(sorted);
    } else {
      setErrorMsg(res.error || "Failed to fetch homepage sections.");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSections();
  }, []);

  async function handleToggleStatus(section: HomepageSection, newStatus: boolean) {
    setTogglingId(section.id);
    
    // Optimistic update
    setSections((prev) =>
      prev.map((s) => (s.id === section.id ? { ...s, isActive: newStatus } : s))
    );

    const res = await toggleHomepageSection(section.id, newStatus);
    setTogglingId(null);

    if (res.success) {
      toast.success(
        `Section "${section.title}" is now ${newStatus ? "Active" : "Inactive"}`
      );
    } else {
      // Rollback on failure
      setSections((prev) =>
        prev.map((s) => (s.id === section.id ? { ...s, isActive: !newStatus } : s))
      );
      toast.error(res.error || "Failed to update section status.");
    }
  }

  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#DADEE7]/60 pb-5">
        <div>
          <CardTitle className="text-xl font-bold text-[#0F1729]">
            Homepage Sections
          </CardTitle>
          <CardDescription className="text-sm text-[#676F7E] mt-1">
            Manage section visibility, titles, descriptions, images, and layout order.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadSections}
            disabled={loading}
            className="border-[#DADEE7] text-[#0F1729] hover:bg-[#F8FAFC]"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin mr-2" />
            ) : (
              <ArrowUpDown className="size-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#676F7E]">
            <Loader2 className="size-8 animate-spin text-[#0EA5E9] mb-3" />
            <p className="text-sm font-medium">Loading homepage sections...</p>
          </div>
        ) : errorMsg ? (
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-6 text-center text-red-700">
            <p className="font-semibold">{errorMsg}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={loadSections}
              className="mt-4 border-red-200 bg-white text-red-700 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        ) : sections.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#676F7E]">
            No homepage sections found.
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section) => {
              const isToggling = togglingId === section.id;

              return (
                <div
                  key={section.id}
                  className={`
                    flex flex-col gap-4 rounded-xl border p-4 transition-all duration-200
                    sm:flex-row sm:items-center sm:justify-between
                    ${
                      section.isActive
                        ? "border-[#DADEE7] bg-white hover:border-[#0EA5E9]/50 hover:shadow-sm"
                        : "border-[#DADEE7]/60 bg-[#F8FAFC]/70 opacity-80"
                    }
                  `}
                >
                  {/* Left Info */}
                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4">
                    {/* Sort Order Badge */}
                    <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#EBF0FA] px-3 py-2 text-xs font-bold text-[#072069]">
                      Order {section.sortOrder}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#0F1729] text-base">
                          {section.title}
                        </h3>

                        {/* Section Key Tag */}
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600 border border-slate-200">
                          {section.sectionKey}
                        </span>

                        {/* Active/Inactive Badge */}
                        {section.isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                            <Eye className="size-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                            <EyeOff className="size-3" /> Inactive
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-[#676F7E] line-clamp-2 max-w-2xl">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex shrink-0 items-center justify-between sm:justify-end gap-4 border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0">
                    {/* Toggle Active Switch */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#676F7E]">
                        {section.isActive ? "Enabled" : "Disabled"}
                      </span>
                      <Switch
                        checked={section.isActive}
                        disabled={isToggling}
                        onCheckedChange={(checked) =>
                          handleToggleStatus(section, checked)
                        }
                      />
                    </div>

                    {/* Edit Button */}
                    <Link
                      href={`/admin/homepage/${section.id}/edit`}
                      className="
                        inline-flex items-center gap-2 rounded-lg border border-[#DADEE7] bg-white
                        px-3.5 py-2 text-sm font-medium text-[#0F1729] shadow-2xs transition-colors
                        hover:border-[#0EA5E9] hover:bg-[#F8FAFC] hover:text-[#072069]
                      "
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
