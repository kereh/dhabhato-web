"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  Dumbbell,
  Monitor,
  Trophy,
  Wrench,
} from "lucide-react";

const facilities = [
  {
    icon: Monitor,
    title: "Laboratorium Komputer",
    desc: "Dilengkapi 40+ PC modern, server rack, dan jaringan fiber optic untuk praktik TKJ.",
    span: "md:col-span-2",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: Wrench,
    title: "Bengkel Otomotif",
    desc: "Peralatan standar industri untuk praktik mesin & kelistrikan kendaraan.",
    span: "",
    gradient: "from-amber-500/10 to-orange-500/5",
  },
  {
    icon: BookOpen,
    title: "Ruang Kelas Digital",
    desc: "Smart board interaktif, AC, dan proyektor di setiap ruangan.",
    span: "",
    gradient: "from-emerald-500/10 to-green-500/5",
  },
  {
    icon: Building2,
    title: "Perpustakaan",
    desc: "Koleksi digital & fisik dengan ribuan judul buku dan akses e-library.",
    span: "md:col-span-2",
    gradient: "from-violet-500/10 to-purple-500/5",
  },
  {
    icon: Dumbbell,
    title: "Lapangan Olahraga",
    desc: "Lapangan futsal, voli, dan basket dengan fasilitas lengkap.",
    span: "",
    gradient: "from-rose-500/10 to-pink-500/5",
  },
  {
    icon: Trophy,
    title: "Aula Serbaguna",
    desc: "Kapasitas 500 orang untuk seminar, ceremony, dan acara sekolah.",
    span: "",
    gradient: "from-secondary/10 to-primary/5",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function HomeFacilities() {
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
          Infrastruktur
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
          Fasilitas Sekolah
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-pretty text-base lg:text-lg">
          Fasilitas modern dan lengkap untuk mendukung proses belajar mengajar
          yang optimal.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {facilities.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className={`group relative p-6 md:p-8 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-secondary/20 transition-all duration-500 ${item.span}`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              aria-hidden="true"
            />

            <div className="relative">
              <item.icon
                className="h-8 w-8 text-secondary mb-4"
                aria-hidden="true"
              />
              <h3 className="font-bold text-white text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
