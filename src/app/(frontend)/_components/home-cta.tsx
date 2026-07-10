"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import schoolData from "@/data/data.json";

export function HomeCTA() {
  const { cta } = schoolData;

  return (
    <section className="container mx-auto px-4 mb-12">
      <motion.div
        className="relative overflow-hidden rounded-3xl p-10 md:p-20 text-center border border-border/50 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-secondary/10 animate-gradient bg-size-[200%_200%]"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[32px_32px] opacity-40"
          aria-hidden="true"
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 blur-[120px] rounded-full"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-tight text-white">
            {cta.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed text-pretty">
            {cta.description}
          </p>
          <div>
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-14 py-6 font-bold text-base transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 animate-pulse-glow"
            >
              {cta.buttonText}
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
