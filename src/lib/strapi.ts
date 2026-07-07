const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export interface StrapiImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown[];
  category: string | null;
  publishedAt: string;
  cover?: StrapiImage;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export function strapiImageUrl(image?: StrapiImage): string | null {
  if (!image) return null;
  const url = image.formats?.medium?.url || image.url;
  if (url.startsWith("/uploads/")) {
    return `/strapi-uploads${url.replace("/uploads", "")}`;
  }
  if (url.startsWith("/")) {
    return `${STRAPI_URL}${url}`;
  }
  return url;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function getPosts(limit?: number): Promise<StrapiPost[]> {
  try {
    const params = new URLSearchParams({
      "populate[0]": "cover",
      "sort[0]": "publishedAt:desc",
    });
    if (limit) {
      params.set("pagination[pageSize]", String(limit));
    }
    const res = await fetch(`${STRAPI_URL}/api/posts?${params}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json: StrapiListResponse<StrapiPost> = await res.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch posts from Strapi:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<StrapiPost | null> {
  try {
    const params = new URLSearchParams({
      "filters[slug][$eq]": slug,
      "populate[0]": "cover",
    });
    const res = await fetch(`${STRAPI_URL}/api/posts?${params}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json: StrapiListResponse<StrapiPost> = await res.json();
    return json.data[0] || null;
  } catch (error) {
    console.error(`Failed to fetch post by slug (${slug}) from Strapi:`, error);
    return null;
  }
}
