import HorizontalPlates from "@/components/HorizontalPlates";
import Navbar from "@/components/Navbar";
import StoryLayers from "@/components/StoryLayers";
import NoiseCancellingSection from "@/components/NoiseCancellingSection";
import TopFeatures from "@/components/TopFeatures";
import DriverSection from "@/components/DriverSection";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative text-white selection:bg-sony-blue selection:text-white">
      <Navbar />
      <StoryLayers />
      <TopFeatures />
      <NoiseCancellingSection />
      <BentoGrid />
      <DriverSection />
      <HorizontalPlates />
      <Footer />
    </main>
  );
}
