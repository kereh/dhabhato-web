"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, type Post } from "@/lib/blog";

interface HomeBlogPreviewProps {
  latestPosts: Post[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function HomeBlogPreview({ latestPosts }: HomeBlogPreviewProps) {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        className="flex items-end justify-between mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Blog & Berita
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            Kabar Terbaru
          </h2>
          <p className="text-muted-foreground text-pretty text-base lg:text-lg">
            Berita, prestasi, dan kegiatan terkini dari SMK Dhabhato.
          </p>
        </div>
        <Link
          href="/blog"
          className="hidden md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        >
          <Button
            variant="ghost"
            className="gap-2 text-foreground hover:bg-muted"
          >
            Lihat Semua <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {latestPosts.length > 0 ? (
          latestPosts.map((post) => (
            <motion.div key={post.documentId} variants={cardVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Card className="h-full border-border/50 bg-card/40 group-hover:bg-card/70 hover:border-secondary/20 hover:shadow-xl transition-all duration-500 backdrop-blur-sm">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-2">
                      {post.category && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] uppercase font-bold tracking-wider bg-secondary/10 text-secondary hover:bg-secondary/20"
                        >
                          {post.category}
                        </Badge>
                      )}
                      <div className="flex items-center text-[10px] text-muted-foreground gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />{" "}
                        <span className="sr-only">Dipublikasikan pada:</span>
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-snug group-hover:text-secondary transition-colors duration-300 text-white text-pretty">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed text-pretty">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <span className="text-xs font-semibold text-secondary underline underline-offset-4 group-hover:text-secondary/80 transition-colors duration-200">
                      Baca selengkapnya
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={cardVariants}
            className="col-span-3 text-center py-16 bg-muted/5 border border-dashed border-border rounded-2xl"
          >
            <p className="text-muted-foreground">Belum ada berita terbaru.</p>
          </motion.div>
        )}
      </motion.div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/blog"
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Button
            variant="outline"
            className="w-full text-foreground border-border"
          >
            Lihat Semua
          </Button>
        </Link>
      </div>
    </section>
  );
}
