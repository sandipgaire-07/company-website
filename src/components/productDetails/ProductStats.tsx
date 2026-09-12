import { Card, CardContent } from "@/components/ui/card";
import { ProductStat } from "@/types/productDetails";

export default function ProductStats({
  stats,
  color,
}: {
  stats: ProductStat[];
  color: string;
}) {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.id} className="relative min-h-[150px] overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 h-1 w-10 rounded-full" style={{ backgroundColor: color }} />
                <p className="text-3xl font-bold text-[#072069] sm:text-4xl">{stat.value}</p>
                <p className="mt-2 font-semibold text-[#0F1729]">{stat.label}</p>
                <p className="mt-1 text-sm leading-5 text-[#676F7E]">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
