"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { getServices } from "@/actions/content";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteServiceDialog from "@/components/admin/services/DeleteServiceDialog";

export default function ServiceList() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadServices() {
    setLoading(true);

    const res = await getServices();

    if (res.success && res.data) {
      setList(res.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Services
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="py-8 text-center text-sm text-[#676F7E]">
            Loading services...
          </p>
        ) : list.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#676F7E]">
            No services found in database. Click "Add Service" to create one.
          </p>
        ) : (
          <div className="space-y-4">
            {list.map((service) => {
              const serviceId = service.id || service.slug;
              const serviceColor = service.color || "#0EA5E9";

              return (
                <div
                  key={serviceId}
                  className="
                    flex flex-col gap-4 rounded-xl
                    border border-[#DADEE7] p-4
                    transition
                    hover:border-[#0EA5E9]/40
                    hover:bg-[#F8FAFC]
                    sm:flex-row sm:items-center sm:justify-between
                  "
                >
                  {/* Service information */}
                  <div className="flex items-center gap-4">
                    <div
                      className="flex size-14 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${serviceColor}15`,
                      }}
                    >
                      <div
                        className="size-5 rounded-full"
                        style={{
                          backgroundColor: serviceColor,
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#0F1729]">
                        {service.title}
                      </h3>

                      <p className="mt-1 max-w-xl text-sm text-[#676F7E]">
                        {service.description}
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                        {Array.isArray(service.features)
                          ? service.features.length
                          : 0}{" "}
                        Features
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/admin/services/${serviceId}/edit`}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-md
                        border
                        border-[#DADEE7]
                        bg-white
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-[#0F1729]
                        transition-colors
                        hover:bg-[#F8FAFC]
                        hover:text-[#072069]
                      "
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Link>

                    <DeleteServiceDialog
                      serviceId={serviceId}
                      serviceName={service.title}
                      onDeleted={loadServices}
                    />
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