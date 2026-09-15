"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  FolderKanban,
  ExternalLink,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

import { PortfolioItem } from "@/types/portfolio";
import { portfolioItems } from "@/data/portfolio";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeletePortfolioDialog from "./DeletePortfolioDialog";

export default function PortfolioList() {
  const [projects, setProjects] = useState<PortfolioItem[]>(portfolioItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);

  // Search filter (Project name, Client, Category, Technologies)
  const filteredProjects = projects
    .filter((project) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      const inTech = project.technologies.some((t) =>
        t.toLowerCase().includes(query)
      );
      return (
        project.projectName.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        inTech
      );
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Handlers
  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success(`Project "${deleteTarget.projectName}" deleted`);
    setDeleteTarget(null);
  }

  function handleTogglePublish(id: string) {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isPublished;
          toast.success(
            `Project "${p.projectName}" is now ${nextState ? "Published" : "Unpublished"}`
          );
          return { ...p, isPublished: nextState };
        }
        return p;
      })
    );
  }

  function handleToggleFeatured(id: string) {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isFeatured;
          toast.success(
            `Project "${p.projectName}" ${nextState ? "marked as Featured" : "unfeatured"}`
          );
          return { ...p, isFeatured: nextState };
        }
        return p;
      })
    );
  }

  function handleSortOrderChange(id: string, newOrder: number) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, sortOrder: newOrder } : p))
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Portfolio / Case Studies
        </h1>
        <p className="text-sm text-[#676F7E]">
          Manage your projects and showcase your work.
        </p>
      </div>

      {/* Search & Create Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#676F7E]" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-[#DADEE7] focus:border-[#0EA5E9]"
          />
        </div>

        <Button
          render={
            <Link href="/admin/portfolio/new">
              <Plus className="size-4 mr-1.5" />
              Add Project
            </Link>
          }
          className="bg-[#072069] text-white hover:bg-[#072069]/90 shrink-0"
        />
      </div>

      {/* Projects Table Card */}
      <Card className="border-[#DADEE7] shadow-sm overflow-hidden">
        <CardHeader className="border-b border-[#DADEE7]/60 pb-4">
          <CardTitle className="text-xl font-bold text-[#0F1729]">
            All Showcase Projects ({filteredProjects.length})
          </CardTitle>
          <CardDescription className="text-sm text-[#676F7E]">
            Projects currently registered in the system.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#F8FAFC] border border-[#DADEE7] text-[#676F7E] mb-4">
                <FolderKanban className="size-7 text-[#0EA5E9]" />
              </div>
              {searchQuery ? (
                <>
                  <h3 className="text-base font-semibold text-[#0F1729]">
                    No projects match your search.
                  </h3>
                  <p className="text-sm text-[#676F7E] mt-1 max-w-sm">
                    No results found for &quot;{searchQuery}&quot;. Try adjusting your search query.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 border-[#DADEE7]"
                  >
                    Clear Search
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-base font-semibold text-[#0F1729]">
                    No portfolio projects yet.
                  </h3>
                  <p className="text-sm text-[#676F7E] mt-1 max-w-sm">
                    Add your first project to showcase your work.
                  </p>
                  <Button
                    render={
                      <Link href="/admin/portfolio/new">
                        <Plus className="size-4 mr-1.5" />
                        Add Project
                      </Link>
                    }
                    className="mt-4 bg-[#072069] text-white hover:bg-[#072069]/90"
                  />
                </>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#DADEE7] text-xs font-semibold uppercase text-[#676F7E] tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">Project</th>
                    <th scope="col" className="px-6 py-3.5">Client</th>
                    <th scope="col" className="px-6 py-3.5">Category</th>
                    <th scope="col" className="px-6 py-3.5">Completion Date</th>
                    <th scope="col" className="px-6 py-3.5">Status</th>
                    <th scope="col" className="px-6 py-3.5">Featured</th>
                    <th scope="col" className="px-6 py-3.5 w-24">Order</th>
                    <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DADEE7]/60 bg-white">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-[#F8FAFC]/80 transition-colors"
                    >
                      {/* Project Image & Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 rounded-lg overflow-hidden border border-[#DADEE7] bg-[#F8FAFC] shrink-0">
                            <Image
                              src={project.projectImage || "/showcase/hospitality.webp"}
                              alt={project.projectName}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-[#0F1729] line-clamp-1">
                              {project.projectName}
                            </p>
                            <p className="text-xs font-mono text-[#676F7E]">
                              /{project.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Client */}
                      <td className="px-6 py-4 text-[#0F1729] font-medium whitespace-nowrap">
                        {project.client}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-md bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                          {project.category}
                        </span>
                      </td>

                      {/* Completion Date */}
                      <td className="px-6 py-4 text-[#676F7E] whitespace-nowrap text-xs">
                        {project.completionDate}
                      </td>

                      {/* Status (Published / Unpublished) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.isPublished ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-slate-200">
                            Unpublished
                          </span>
                        )}
                      </td>

                      {/* Featured */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.isFeatured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                            <Star className="size-3 fill-amber-500 text-amber-500" /> Featured
                          </span>
                        ) : (
                          <span className="text-xs text-[#676F7E]">—</span>
                        )}
                      </td>

                      {/* Order Input */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input
                          type="number"
                          value={project.sortOrder}
                          onChange={(e) =>
                            handleSortOrderChange(
                              project.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-16 h-8 text-xs font-mono border-[#DADEE7] text-center"
                        />
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="text-[#676F7E] hover:text-[#0F1729]"
                              >
                                <MoreVertical className="size-4" />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align="end" className="w-52 bg-white border border-[#DADEE7] shadow-xl rounded-xl p-1.5 z-50">
                            <DropdownMenuItem
                              className="cursor-pointer font-medium text-[#0F1729] hover:bg-[#F8FAFC] focus:bg-[#F8FAFC] focus:text-[#072069]"
                              render={
                                <Link href={`/admin/portfolio/${project.id}/edit`} className="flex items-center w-full">
                                  <Pencil className="size-4 mr-2 text-[#0EA5E9]" />
                                  Edit Project
                                </Link>
                              }
                            />
                            <DropdownMenuItem
                              className="cursor-pointer font-medium text-[#0F1729] hover:bg-[#F8FAFC] focus:bg-[#F8FAFC] focus:text-[#072069]"
                              render={
                                <Link href={`/portfolio/${project.slug}`} target="_blank" className="flex items-center w-full">
                                  <ExternalLink className="size-4 mr-2 text-[#072069]" />
                                  View Public Page
                                </Link>
                              }
                            />
                            <DropdownMenuItem
                              onClick={() => handleTogglePublish(project.id)}
                              className="cursor-pointer font-medium text-[#0F1729] hover:bg-[#F8FAFC] focus:bg-[#F8FAFC]"
                            >
                              {project.isPublished ? (
                                <>
                                  <EyeOff className="size-4 mr-2 text-slate-500" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Eye className="size-4 mr-2 text-emerald-600" />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleFeatured(project.id)}
                              className="cursor-pointer font-medium text-[#0F1729] hover:bg-[#F8FAFC] focus:bg-[#F8FAFC]"
                            >
                              <Star className="size-4 mr-2 text-amber-500" />
                              {project.isFeatured ? "Unfeature" : "Make Featured"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeleteTarget(project)}
                              variant="destructive"
                              className="cursor-pointer font-medium text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700"
                            >
                              <Trash2 className="size-4 mr-2 text-red-600" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      {deleteTarget && (
        <DeletePortfolioDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          projectName={deleteTarget.projectName}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
