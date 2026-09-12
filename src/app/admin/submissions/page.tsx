"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Sparkles,
  Briefcase,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Archive,
  RefreshCw,
} from "lucide-react";
import {
  adminGetContactSubmissions,
  adminUpdateContactStatus,
  adminGetDemoRequests,
  adminUpdateDemoRequestStatus,
  adminGetJobApplications,
  adminUpdateJobApplicationStatus,
} from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminSubmissionsPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "demo" | "jobs">("contact");

  const [contactList, setContactList] = useState<any[]>([]);
  const [demoList, setDemoList] = useState<any[]>([]);
  const [jobList, setJobList] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  async function loadData() {
    setIsLoading(true);
    try {
      const [contactRes, demoRes, jobRes] = await Promise.all([
        adminGetContactSubmissions(),
        adminGetDemoRequests(),
        adminGetJobApplications(),
      ]);

      if (contactRes.success && contactRes.data) {
        setContactList(contactRes.data);
      }
      if (demoRes.success && demoRes.data) {
        setDemoList(demoRes.data);
      }
      if (jobRes.success && jobRes.data) {
        setJobList(jobRes.data);
      }
    } catch (err: any) {
      toast.error("Failed to load submissions.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleContactStatusChange(id: string, newStatus: "new" | "read" | "archived") {
    const res = await adminUpdateContactStatus(id, newStatus);
    if (res.success) {
      toast.success("Contact status updated.");
      setContactList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } else {
      toast.error(res.error || "Failed to update status.");
    }
  }

  async function handleDemoStatusChange(id: string, newStatus: "pending" | "contacted" | "closed") {
    const res = await adminUpdateDemoRequestStatus(id, newStatus);
    if (res.success) {
      toast.success("Demo request status updated.");
      setDemoList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } else {
      toast.error(res.error || "Failed to update status.");
    }
  }

  async function handleJobStatusChange(
    id: string,
    newStatus: "pending" | "reviewed" | "rejected" | "hired"
  ) {
    const res = await adminUpdateJobApplicationStatus(id, newStatus);
    if (res.success) {
      toast.success("Job application status updated.");
      setJobList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } else {
      toast.error(res.error || "Failed to update status.");
    }
  }

  const filteredContacts = contactList.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDemos = demoList.filter(
    (d) =>
      d.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobList.filter(
    (j) =>
      j.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Submissions & Leads</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review user messages, demo requests, and job applications stored in Supabase.
          </p>
        </div>
        <Button
          onClick={loadData}
          variant="outline"
          className="self-start sm:self-auto gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              activeTab === "contact"
                ? "bg-[#072069] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Mail className="h-4 w-4" /> Contact Enquiries ({contactList.length})
          </button>

          <button
            onClick={() => setActiveTab("demo")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              activeTab === "demo"
                ? "bg-[#072069] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Sparkles className="h-4 w-4" /> Demo Requests ({demoList.length})
          </button>

          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              activeTab === "jobs"
                ? "bg-[#072069] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Briefcase className="h-4 w-4" /> Job Applications ({jobList.length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
      </div>

      {/* Content Tables */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400">Loading submissions...</div>
      ) : (
        <div>
          {/* TAB 1: CONTACT ENQUIRIES */}
          {activeTab === "contact" && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {filteredContacts.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  No contact form submissions found in database.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-4">Sender</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Subject & Message</th>
                        <th className="p-4">Submitted At</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredContacts.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/50">
                          <td className="p-4">
                            <div className="font-semibold text-slate-900">{c.name}</div>
                            {c.company && (
                              <div className="text-xs text-slate-500">{c.company}</div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="text-slate-900">{c.email}</div>
                            {c.phone && <div className="text-xs text-slate-500">{c.phone}</div>}
                          </td>
                          <td className="p-4 max-w-xs">
                            {c.subject && (
                              <div className="font-medium text-slate-800 text-xs mb-1">
                                {c.subject}
                              </div>
                            )}
                            <div className="text-xs text-slate-600 line-clamp-3">{c.message}</div>
                          </td>
                          <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(c.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <select
                              value={c.status || "new"}
                              onChange={(e) =>
                                handleContactStatusChange(c.id, e.target.value as any)
                              }
                              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 focus:outline-none"
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DEMO REQUESTS */}
          {activeTab === "demo" && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {filteredDemos.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  No demo requests found in database.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-4">Requester</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Product Interest</th>
                        <th className="p-4">Notes</th>
                        <th className="p-4">Requested At</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDemos.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50/50">
                          <td className="p-4">
                            <div className="font-semibold text-slate-900">{d.full_name}</div>
                            {d.company_name && (
                              <div className="text-xs text-slate-500">{d.company_name}</div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="text-slate-900">{d.email}</div>
                            <div className="text-xs text-slate-500">{d.phone}</div>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                              {d.product_name || d.product_interest || "General Demo"}
                            </span>
                          </td>
                          <td className="p-4 max-w-xs text-xs text-slate-600">
                            {d.message || "No additional note"}
                          </td>
                          <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(d.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <select
                              value={d.status || "pending"}
                              onChange={(e) =>
                                handleDemoStatusChange(d.id, e.target.value as any)
                              }
                              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: JOB APPLICATIONS */}
          {activeTab === "jobs" && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {filteredJobs.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  No job applications found in database.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-4">Candidate</th>
                        <th className="p-4">Applied Role</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Resume / CV</th>
                        <th className="p-4">Applied At</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredJobs.map((j) => (
                        <tr key={j.id} className="hover:bg-slate-50/50">
                          <td className="p-4 font-semibold text-slate-900">{j.full_name}</td>
                          <td className="p-4">
                            <span className="font-medium text-[#072069]">{j.job_title}</span>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-900">{j.email}</div>
                            <div className="text-xs text-slate-500">{j.phone}</div>
                          </td>
                          <td className="p-4">
                            <a
                              href={j.resume_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-sky-600 hover:underline inline-flex items-center gap-1"
                            >
                              View Resume ↗
                            </a>
                          </td>
                          <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(j.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <select
                              value={j.status || "pending"}
                              onChange={(e) =>
                                handleJobStatusChange(j.id, e.target.value as any)
                              }
                              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="rejected">Rejected</option>
                              <option value="hired">Hired</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
