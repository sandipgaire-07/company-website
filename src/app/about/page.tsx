import AboutHero from "@/components/aboutPage/AboutHero";
import MissionVision from "@/components/aboutPage/MissionVision";
import OurStory from "@/components/aboutPage/ourStory";
import Stats from "@/components/aboutPage/Stats";
import TrustedCompanies from "@/components/homePage/TrustedCompanies";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory/>
      <Stats/>
      <MissionVision/>
      <TrustedCompanies/>
    </main>
  );
}