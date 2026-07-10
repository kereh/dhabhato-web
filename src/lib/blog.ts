export interface PostImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface Post {
  id: string | number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown[];
  category: string | null;
  publishedAt: string;
  cover?: PostImage;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getPostImageUrl(image?: PostImage): string | null {
  if (!image) return null;
  return image.url;
}
