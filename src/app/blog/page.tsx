import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/strapi";
import { BlogArticleCard, BlogSearchBar } from "./_components";

export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getPosts();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <Badge
            variant="outline"
            className="text-xs uppercase tracking-widest border-secondary/20 bg-secondary/5 text-secondary font-semibold"
          >
            Blog & Berita
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-balance">
            Kabar SMK Dhabhato
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg text-pretty">
            Temukan informasi terbaru mengenai kegiatan, prestasi, dan
            pengumuman resmi dari sekolah kami.
          </p>
        </div>
        <BlogSearchBar />
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-2xl bg-muted/5 border-border">
          <p className="text-lg text-muted-foreground">
            Belum ada artikel yang dipublikasikan.
          </p>
          <p className="text-sm text-muted-foreground/75 mt-2">
            Silakan tambahkan artikel di Strapi CMS.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((post) => (
            <BlogArticleCard key={post.documentId} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
