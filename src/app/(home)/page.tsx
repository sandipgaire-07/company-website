import About from "@/components/homePage/AboutUs";
import AchievementStory from "@/components/homePage/AchivementStory";
import CTA from "@/components/homePage/Cta";
import FAQ from "@/components/homePage/Faq";
import Hero from "@/components/homePage/Hero";
import Products from "@/components/homePage/Products";
import Services from "@/components/homePage/Services";
import Testimonials from "@/components/homePage/Testimonials";
import TrustedCompanies from "@/components/homePage/TrustedCompanies";
import Image from "next/image";

export default function Home() {
  return (
    <>
       <Hero/>
     <About/>
     <AchievementStory/>
     <TrustedCompanies />
     <Services />
     <Products/>
     <CTA/>
     <Testimonials />
     <FAQ/>
     </>
  
  );
}
