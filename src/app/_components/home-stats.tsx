"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, TrendingUp, Users } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import schoolData from "@/data/data.json";

const icons = [GraduationCap, TrendingUp, BookOpen, Users];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

function parseStatValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) return { number: Number.parseInt(match[1], 10), suffix: match[2] };
  return { number: 0, suffix: value };
}

export function HomeStats() {
  const { stats } = schoolData;

  return (
    <section className="container mx-auto px-4 -mt-8">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {stats.map((stat, i) => {
          const Icon = icons[i % icons.length];
          const { number, suffix } = parseStatValue(stat.value);
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group text-center p-6 md:p-8 rounded-2xl bg-card/60 border border-border/50 hover:border-secondary/20 transition-all duration-500 backdrop-blur-sm relative overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-b from-secondary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/10 mb-4 border border-secondary/15">
                  <Icon className="h-5 w-5 text-secondary" aria-hidden="true" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 tabular-nums text-secondary">
                  <CountUp target={number} suffix={suffix} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-semibold uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
