/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: allow */
"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import schoolData from "@/data/data.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

const floatingShapes = [
  { size: 60, left: "12%", top: "18%", delay: 0, duration: 7, rotate: 45 },
  { size: 40, left: "85%", top: "25%", delay: 1, duration: 8, rotate: 0 },
  { size: 50, left: "75%", top: "68%", delay: 0.5, duration: 6, rotate: 30 },
  { size: 35, left: "20%", top: "72%", delay: 1.5, duration: 9, rotate: 60 },
  { size: 25, left: "50%", top: "12%", delay: 2, duration: 7, rotate: 15 },
  { size: 45, left: "92%", top: "50%", delay: 0.8, duration: 8, rotate: 75 },
];

export function HomeHero() {
  const { school } = schoolData;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-linear-to-b from-primary/8 via-background to-background"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_60%_at_50%_30%,#000_50%,transparent_100%)]"
        aria-hidden="true"
      />

      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {floatingShapes.map((shape, i) => (
        <motion.div
          key={`shape-${shape.left}-${shape.top}`}
          className="absolute border border-primary/10 rounded-lg pointer-events-none"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
            top: shape.top,
            rotate: `${shape.rotate}deg`,
          }}
          animate={{
            y: [-15, 15, -15],
            rotate: [shape.rotate, shape.rotate + 90, shape.rotate],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: shape.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: shape.delay,
          }}
          aria-hidden="true"
        />
      ))}

      <motion.div
        className="container mx-auto px-4 text-center relative z-10 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge
            variant="outline"
            className="mb-8 py-1.5 px-5 text-xs tracking-[0.2em] uppercase border-secondary/25 bg-secondary/5 text-secondary font-semibold backdrop-blur-sm"
          >
            {school.tagline}
          </Badge>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 text-balance leading-[0.95] text-white"
        >
          SMK Dharma Bhakti{" "}
          <span className="bg-linear-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent bg-size-[200%_auto]">
            Tomohon
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-muted-foreground mb-14 leading-relaxed text-pretty"
        >
          {school.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/#about" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full rounded-full px-10 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/15 hover:shadow-xl hover:shadow-secondary/25 hover:-translate-y-0.5"
            >
              Daftar Sekarang
            </Button>
          </Link>
          <Link href="/#programs" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full px-10 gap-2 border-border/50 text-foreground hover:bg-muted/50 hover:border-border transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Pelajari Lebih Lanjut
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            className="h-5 w-5 text-muted-foreground/60"
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
