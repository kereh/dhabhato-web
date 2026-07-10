/* biome-ignore-all lint/suspicious/noExplicitAny: database docs and Lexical nodes are dynamic and require any casting */
import config from "@payload-config";
import { getPayload } from "payload";
import type { Post } from "./blog";

export async function getPosts(limit?: number): Promise<Post[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      limit: limit || 100,
      sort: "-publishedAt",
      depth: 2,
    });

    return result.docs.map((doc: any) => ({
      id: doc.id,
      documentId: String(doc.id),
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt || "",
      category:
        doc.category && typeof doc.category === "object"
          ? doc.category.name
          : null,
      publishedAt: doc.publishedAt || doc.createdAt,
      cover:
        doc.cover && typeof doc.cover === "object"
          ? {
              url: doc.cover.url || "",
              alternativeText: doc.cover.alt || "",
              width: doc.cover.width || 800,
              height: doc.cover.height || 500,
            }
          : undefined,
      content:
        doc.content && typeof doc.content === "object" && "root" in doc.content
          ? (doc.content as any).root?.children || []
          : Array.isArray(doc.content)
            ? doc.content
            : [],
    }));
  } catch (error) {
    console.warn(
      "Could not fetch posts from Payload CMS (database tables may not exist yet):",
      error,
    );
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 2,
    });

    if (!result.docs.length) return null;
    const doc = result.docs[0];

    return {
      id: doc.id,
      documentId: String(doc.id),
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt || "",
      category:
        doc.category && typeof doc.category === "object"
          ? doc.category.name
          : null,
      publishedAt: doc.publishedAt || doc.createdAt,
      cover:
        doc.cover && typeof doc.cover === "object"
          ? {
              url: doc.cover.url || "",
              alternativeText: doc.cover.alt || "",
              width: doc.cover.width || 800,
              height: doc.cover.height || 500,
            }
          : undefined,
      content:
        doc.content && typeof doc.content === "object" && "root" in doc.content
          ? (doc.content as any).root?.children || []
          : Array.isArray(doc.content)
            ? doc.content
            : [],
    };
  } catch (error) {
    console.warn(`Could not fetch post ${slug} from Payload CMS:`, error);
    return null;
  }
}
