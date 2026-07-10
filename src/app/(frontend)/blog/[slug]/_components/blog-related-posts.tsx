import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, getPostImageUrl, type Post } from "@/lib/blog";

interface BlogRelatedPostsProps {
  relatedPosts: Post[];
}

export function BlogRelatedPosts({ relatedPosts }: BlogRelatedPostsProps) {
  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold tracking-tight text-white">
          Berita Lainnya
        </h3>
        <Link
          href="/blog"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
        >
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs font-semibold text-foreground"
          >
            Lihat semua{" "}
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((related) => {
          const relatedImg = getPostImageUrl(related.cover);
          return (
            <Link
              key={related.documentId}
              href={`/blog/${related.slug}`}
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card className="h-full overflow-hidden border-border bg-card/45 group-hover:bg-card/70 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                <div className="aspect-16/10 relative bg-muted/10 overflow-hidden border-b border-border">
                  {relatedImg ? (
                    <Image
                      src={relatedImg}
                      alt={related.cover?.alternativeText || related.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-muted/5">
                      <svg
                        className="w-8 h-8 text-secondary/35 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        />
                      </svg>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60">
                        SMK Dhabhato
                      </span>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1 text-[10px] uppercase font-bold tracking-wider">
                    {related.category && (
                      <span className="text-secondary">{related.category}</span>
                    )}
                    <span className="text-muted-foreground" aria-hidden="true">
                      •
                    </span>
                    <span className="text-muted-foreground font-normal">
                      {formatDate(related.publishedAt)}
                    </span>
                  </div>
                  <CardTitle className="text-sm leading-snug group-hover:text-secondary transition-colors duration-200 line-clamp-2 text-white text-pretty">
                    {related.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed text-pretty">
                    {related.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
