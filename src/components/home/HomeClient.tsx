"use client"

import { CategoryGrid } from "./CategoryGrid";
import HeroFade from "./HeroFade";
import { HeroSection } from "./HeroSection";
import { HowItWorks } from "./HowItWorks";
import Reveal from "./Reveal";
import { Testimonials } from "./Testimonials";
import { TrustMetrics } from "./TrustMetrics";
import { TutorCTA } from "./TutorCTA";

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
          <HeroFade>
            <HeroSection />
          </HeroFade>
    
          <div className="relative z-10 -mt-20">
            <Reveal delay={0.5}>
              <TrustMetrics />
            </Reveal>
          </div>
    
          <Reveal><CategoryGrid /></Reveal>
          <Reveal><HowItWorks /></Reveal>
          <Reveal><Testimonials /></Reveal>
          
          <div className="pb-20">
            <Reveal><TutorCTA /></Reveal>
          </div>
        </main>
  )
}
