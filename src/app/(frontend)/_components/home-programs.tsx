"use client";

import { motion } from "framer-motion";
import { Briefcase, Monitor, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import schoolData from "@/data/data.json";

const programStyles: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    accent: string;
    glow: string;
    topLine: string;
  }
> = {
  tkj: {
    icon: Monitor,
    gradient: "from-blue-500/15 to-blue-600/5",
    accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    glow: "group-hover:shadow-blue-500/10",
    topLine: "from-blue-400/60 to-blue-600/20",
  },
  otomotif: {
    icon: Wrench,
    gradient: "from-amber-500/15 to-amber-600/5",
    accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    glow: "group-hover:shadow-amber-500/10",
    topLine: "from-amber-400/60 to-amber-600/20",
  },
  bisnis: {
    icon: Briefcase,
    gradient: "from-emerald-500/15 to-emerald-600/5",
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    glow: "group-hover:shadow-emerald-500/10",
    topLine: "from-emerald-400/60 to-emerald-600/20",
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function HomePrograms() {
  const { programs } = schoolData;

  return (
    <section id="programs" className="py-24 scroll-mt-24 relative">
      <div
        className="absolute inset-0 bg-linear-to-b from-muted/5 via-transparent to-muted/5 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Pilihan Jurusan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            Program Keahlian
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty text-base lg:text-lg">
            Pilih jurusan yang sesuai dengan minat dan passion-mu untuk masa
            depan yang lebih baik.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {programs.map((program) => {
            const style = programStyles[program.id] || programStyles.tkj;
            const IconComponent = style.icon;
            return (
              <motion.div key={program.id} variants={cardVariants}>
                <Card
                  className={`group relative bg-card/50 border-border/50 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm overflow-hidden hover:shadow-2xl ${style.glow}`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${style.topLine}`}
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-b ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  <CardHeader className="relative">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border ${style.accent}`}
                    >
                      <IconComponent className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl tracking-tight text-white group-hover:text-foreground transition-colors">
                      {program.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {program.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
