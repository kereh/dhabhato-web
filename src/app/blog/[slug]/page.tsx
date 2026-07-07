import Image from "next/image";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@/components/blog/blocks-renderer";
import { getPostBySlug, getPosts, strapiImageUrl } from "@/lib/strapi";
import { BlogPostHeader, BlogRelatedPosts } from "./_components";

export const revalidate = 60;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = strapiImageUrl(post.cover);
  const wordCount = post.excerpt?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const allPosts = await getPosts(4);
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      <BlogPostHeader post={post} readTime={readTime} />

      {/* Cover image */}
      {imageUrl && (
        <div className="aspect-video relative rounded-2xl overflow-hidden bg-muted/10 mb-10 border border-border shadow-md">
          <Image
            src={imageUrl}
            alt={post.cover?.alternativeText || post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      {/* Lead paragraph */}
      {post.excerpt && (
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 border-l-4 border-secondary/40 pl-5 italic text-pretty">
          {post.excerpt}
        </p>
      )}

      {/* Article body */}
      <BlocksRenderer content={post.content} />

      {/* Related Posts */}
      <BlogRelatedPosts relatedPosts={relatedPosts} />
    </article>
  );
}
