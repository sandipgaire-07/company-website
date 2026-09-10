import About from "@/components/homePage/AboutUs";
import AchievementStory from "@/components/homePage/AchivementStory";
import Hero from "@/components/homePage/Hero";
import TrustedCompanies from "@/components/homePage/TrustedCompanies";
import Image from "next/image";

export default function Home() {
  return (
    <>
       <Hero/>
     <TrustedCompanies />
     <About/>
     <AchievementStory/>
     </>
  
  );
}
