import BottomStatementSection from "@/components/BottomStatementSection";
import FeaturesSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorkSection";
import ScanningSection from "@/components/ScanningSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ScanningSection />
      <BottomStatementSection />
    </main>
  );
}
