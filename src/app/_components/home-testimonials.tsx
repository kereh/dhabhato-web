"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import schoolData from "@/data/data.json";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function HomeTestimonials() {
  const { testimonials } = schoolData;

  return (
    <section className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Testimoni
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
          Kata Mereka Tentang Kami
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-pretty text-base lg:text-lg">
          Dengarkan langsung dari alumni yang telah merasakan pengalaman belajar
          di SMK Dhabhato.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={cardVariants}
            className="group relative p-8 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-secondary/20 transition-all duration-500"
          >
            <div
              className="absolute top-6 right-8 text-6xl font-serif text-secondary/10 leading-none select-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={`star-${t.name}-${i}`}
                  className="h-4 w-4 fill-secondary text-secondary"
                  aria-hidden="true"
                />
              ))}
            </div>

            <p className="text-foreground/80 text-sm leading-relaxed mb-8 text-pretty relative">
              {t.quote}
            </p>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white shrink-0">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
