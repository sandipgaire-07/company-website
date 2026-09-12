import Link from "next/link";
import { Pencil } from "lucide-react";

import { serviceDetails } from "@/data/services/serviceDetails";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteServiceDialog from "@/components/admin/services/DeleteServiceDialog";

export default function ServiceList() {
  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Services
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {serviceDetails.map((service) => (
            <div
              key={service.id}
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
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <div
                    className="size-5 rounded-full"
                    style={{ backgroundColor: service.color }}
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
                    {service.features.length} Features
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-[#DADEE7]"
                  render={
                    <Link href={`/admin/services/${service.id}/edit`} />
                  }
                >
                  <Pencil />
                  Edit
                </Button>

                <DeleteServiceDialog serviceName={service.title} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}