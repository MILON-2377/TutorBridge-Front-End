import { HeroSection } from "@/src/components/home/HeroSection";
import { TrustMetrics } from "@/src/components/home/TrustMetrics";
import { CategoryGrid } from "@/src/components/home/CategoryGrid";
import { TutorCTA } from "@/src/components/home/TutorCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Value Proposition Section */}
      <HeroSection />

      {/* Proof & Social Validation Section */}
      <div className="relative z-10 -mt-20">
        <TrustMetrics />
      </div>

      {/* Discovery Section */}
      <CategoryGrid />

      {/* Secondary Conversion Section (Recruitment) */}
      <TutorCTA />
    </main>
  );
}
