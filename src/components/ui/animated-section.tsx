"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimationVariant =
  | "fadeUp"
  | "fadeLeft"
  | "fadeRight"
  | "fadeIn"
  | "scaleIn";

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

const animations: Record<
  AnimationVariant,
  { hidden: Record<string, number>; visible: Record<string, number> }
> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      variants={animations[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
