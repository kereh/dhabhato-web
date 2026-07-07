"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Check, Users } from "lucide-react";
import Image from "next/image";
import schoolData from "@/data/data.json";

export function HomeAbout() {
  const { school, about } = schoolData;

  return (
    <section id="about" className="container mx-auto px-4 scroll-mt-24">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance leading-tight">
              {about.title}
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-pretty text-base lg:text-lg">
            {about.description}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {about.points.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 * i,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <div className="h-7 w-7 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 shrink-0">
                  <Check
                    className="h-3.5 w-3.5 text-secondary"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-sm font-medium text-foreground/80">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
        >
          <div
            className="absolute -inset-4 bg-linear-to-br from-primary/10 via-secondary/5 to-transparent rounded-[2rem] blur-2xl"
            aria-hidden="true"
          />

          <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm shadow-2xl">
            <div className="h-1.5 bg-linear-to-r from-primary via-secondary to-primary" />
            <div className="p-8 md:p-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="absolute -inset-1 bg-linear-to-r from-primary/20 to-secondary/20 rounded-full blur-sm"
                    aria-hidden="true"
                  />
                  <Image
                    src={school.logo}
                    alt={`${school.name} Logo`}
                    width={64}
                    height={64}
                    className="rounded-full relative border-2 border-border/50"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">
                    {school.shortName}
                  </h3>
                  <p className="text-xs text-muted-foreground">{school.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Award, label: "Akreditasi", value: "A" },
                  { icon: BookOpen, label: "Jurusan", value: "5" },
                  { icon: Users, label: "Alumni", value: "2000+" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="text-center p-4 rounded-xl bg-muted/30 border border-border/30"
                  >
                    <item.icon
                      className="h-5 w-5 text-secondary mx-auto mb-2"
                      aria-hidden="true"
                    />
                    <div className="text-lg font-bold text-white">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border/30 text-center">
                <p className="text-sm text-muted-foreground italic">
                  &ldquo;{school.tagline}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
