import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate, type StrapiPost } from "@/lib/strapi";

interface BlogPostHeaderProps {
  post: StrapiPost;
  readTime: number;
}

export function BlogPostHeader({ post, readTime }: BlogPostHeaderProps) {
  return (
    <>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md p-1 -ml-1"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke Blog
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        {post.category && (
          <Badge
            variant="secondary"
            className="rounded-full text-xs font-semibold uppercase tracking-widest bg-secondary/10 text-secondary border border-secondary/15"
          >
            {post.category}
          </Badge>
        )}
        <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {readTime} min read
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight mb-6 text-white text-balance">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 mb-10 pb-8 border-b border-border">
        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20">
          <User className="h-5 w-5 text-secondary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Admin Sekolah</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Dipublikasikan pada:</span>
            {formatDate(post.publishedAt)}
          </div>
        </div>
      </div>
    </>
  );
}
