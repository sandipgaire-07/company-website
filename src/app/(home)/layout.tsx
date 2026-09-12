import Navbar from "@/components/homePage/navbar";
import Footer from "@/components/homePage/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
