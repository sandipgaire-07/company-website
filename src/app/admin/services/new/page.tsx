import ServiceForm from "@/components/admin/services/ServiceForm";
import { Button } from "@base-ui/react";
import Link from "next/link";


export default function NewServicePage() {
  return (
    <div className="space-y-6">
         <Button
          className="p-2 rounded bg-linear-to-r bg-[#072069]  text-white hover:opacity-90"
          render={<Link href="/admin/services" />}
        >
          Back to Service
        </Button>
      <div className="mt-3">
         
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Add Service
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Add a new service to your website.
        </p>
      </div>
     <ServiceForm/>
    </div>
  );
}