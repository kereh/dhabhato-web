"use client";

import Image from "next/image";
import type { StrapiPost } from "@/lib/strapi";

interface TextChild {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkChild {
  type: "link";
  url: string;
  children: TextChild[];
}

type InlineChild = TextChild | LinkChild;

interface BlockNode {
  type: string;
  children?: InlineChild[];
  level?: number;
  format?: string;
  image?: {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };
}

function renderInline(child: InlineChild, i: number) {
  if (child.type === "link") {
    return (
      <a
        key={i}
        href={child.url}
        className="underline text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        {child.children?.map((c, j) => renderInline(c, j))}
      </a>
    );
  }

  let text: React.ReactNode = child.text;
  if (child.bold) text = <strong key={i}>{text}</strong>;
  if (child.italic) text = <em key={i}>{text}</em>;
  if (child.underline) text = <u key={i}>{text}</u>;
  if (child.code)
    text = (
      <code
        key={i}
        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
      >
        {text}
      </code>
    );
  return <span key={i}>{text}</span>;
}

function renderBlock(block: BlockNode, i: number) {
  const children = block.children?.map((child, j) => renderInline(child, j));

  switch (block.type) {
    case "heading": {
      const Tag = `h${block.level || 2}` as keyof React.JSX.IntrinsicElements;
      return (
        <Tag
          key={i}
          className="text-foreground font-bold mt-8 mb-4 tracking-tight text-balance scroll-mt-20"
        >
          {children}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p key={i} className="mb-5 leading-relaxed">
          {children}
        </p>
      );
    case "list":
      if (block.format === "ordered") {
        return (
          <ol key={i} className="list-decimal pl-6 mb-5 space-y-2">
            {block.children?.map((child, j) =>
              renderBlock(child as unknown as BlockNode, j),
            )}
          </ol>
        );
      }
      return (
        <ul key={i} className="list-disc pl-6 mb-5 space-y-2">
          {block.children?.map((child, j) =>
            renderBlock(child as unknown as BlockNode, j),
          )}
        </ul>
      );
    case "list-item":
      return (
        <li key={i} className="leading-relaxed">
          {block.children?.map((child, j) => renderInline(child, j))}
        </li>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="border-l-4 border-primary/40 pl-4 py-1 my-6 italic text-muted-foreground bg-muted/30 rounded-r-md"
        >
          {children}
        </blockquote>
      );
    case "image": {
      const imgUrl = block.image?.url;
      if (!imgUrl) return null;

      let resolvedUrl = imgUrl;
      if (imgUrl.startsWith("/uploads/")) {
        resolvedUrl = `/strapi-uploads${imgUrl.replace("/uploads", "")}`;
      } else if (imgUrl.startsWith("/")) {
        const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
        resolvedUrl = `${STRAPI_URL}${imgUrl}`;
      }

      return (
        <figure
          key={i}
          className="my-8 overflow-hidden rounded-2xl border border-border"
        >
          {block.image?.width && block.image?.height ? (
            <Image
              src={resolvedUrl}
              alt={block.image.alternativeText || "Post Image"}
              width={block.image.width}
              height={block.image.height}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          ) : (
            <div className="aspect-video relative w-full">
              <Image
                src={resolvedUrl}
                alt={block.image?.alternativeText || "Post Image"}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
        </figure>
      );
    }
    default:
      return (
        <p key={i} className="mb-5 leading-relaxed">
          {children}
        </p>
      );
  }
}

export function BlocksRenderer({
  content,
}: {
  content: StrapiPost["content"];
}) {
  if (!content || !Array.isArray(content)) return null;
  return (
    <div className="prose-custom">
      {(content as BlockNode[]).map((block, i) => renderBlock(block, i))}
    </div>
  );
}
