"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/src/components/home/HeroSection";
import { TrustMetrics } from "@/src/components/home/TrustMetrics";
import { CategoryGrid } from "@/src/components/home/CategoryGrid";
import { HowItWorks } from "@/src/components/home/HowItWorks";
import { Testimonials } from "@/src/components/home/Testimonials";
import { TutorCTA } from "@/src/components/home/TutorCTA";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        className="relative z-10 -mt-20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <TrustMetrics />
      </motion.div>

      <motion.section {...fadeInUp}>
        <CategoryGrid />
      </motion.section>

      <motion.section {...fadeInUp}>
        <HowItWorks />
      </motion.section>

      <motion.section {...fadeInUp}>
        <Testimonials />
      </motion.section>

      <motion.div {...fadeInUp} className="pb-20">
        <TutorCTA />
      </motion.div>
    </main>
  );
}
