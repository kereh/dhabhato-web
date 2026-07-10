import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, getPostImageUrl, type Post } from "@/lib/blog";

interface BlogArticleCardProps {
  post: Post;
}

export function BlogArticleCard({ post }: BlogArticleCardProps) {
  const imageUrl = getPostImageUrl(post.cover);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full overflow-hidden border-border bg-card/50 hover:bg-card/85 group-hover:shadow-xl group-hover:border-primary/20 transition-all duration-300 backdrop-blur-sm">
        <div className="aspect-video relative overflow-hidden bg-muted/10 border-b border-border">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.cover?.alternativeText || post.title}
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-muted/5">
              <svg
                className="w-10 h-10 text-secondary/35 mb-2"
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
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
                SMK Dharma Bhakti Tomohon
              </span>
            </div>
          )}
        </div>
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
            {post.category && (
              <>
                <span className="text-secondary">{post.category}</span>
                <span className="text-muted-foreground" aria-hidden="true">
                  •
                </span>
              </>
            )}
            <div className="flex items-center text-muted-foreground gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Dipublikasikan pada:</span>
              {formatDate(post.publishedAt)}
            </div>
          </div>
          <CardTitle className="text-xl leading-snug group-hover:text-secondary transition-colors duration-200 text-white text-pretty">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed text-pretty">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            variant="link"
            className="p-0 h-auto text-xs font-bold uppercase tracking-widest text-secondary group-hover:translate-x-1 transition-transform focus-visible:ring-0"
            asChild
          >
            <span>Baca Selengkapnya</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
