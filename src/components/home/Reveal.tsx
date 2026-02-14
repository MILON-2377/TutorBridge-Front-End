"use client";

import { HTMLMotionProps, motion } from "motion/react";
import { ReactNode } from "react";

const fadeInUp: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      {...fadeInUp}
      transition={{ ...fadeInUp.transition, delay }}
    >
      {children}
    </motion.div>
  );
}