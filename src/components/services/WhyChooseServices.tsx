import { ShieldCheck, Cpu, Repeat, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const advantages = [
  {
    icon: Cpu,
    title: "Tailored Architecture",
    description: "We build custom software and web applications specifically designed around your unique business workflows and goals.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Reliability & Security",
    description: "Engineered with performance, data security, and scalability from day one to ensure long-term stability.",
  },
  {
    icon: Repeat,
    title: "Agile & Transparent Process",
    description: "Clear milestones, constant communication, and iterative delivery keep you informed at every phase of development.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support & Growth",
    description: "Post-launch maintenance, optimization, and continuous feature expansion to help your business stay ahead.",
  },
];

export default function WhyChooseServices() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Why Partner With Us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
            Built for Scale, Speed, and Quality
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-4 text-base leading-7 text-[#676F7E]">
            We combine deep technical expertise with modern design principles to deliver digital products that drive real business growth.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="group border border-slate-100 bg-[#F8FAFC]/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#072069]/5 text-[#072069] transition-colors duration-300 group-hover:bg-[#0EA5E9] group-hover:text-white">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#0F1729]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#676F7E]">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
