import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [],
    },
    {
      slug: "media",
      access: {
        read: () => true,
      },
      upload: {
        staticDir: path.resolve(dirname, "../public/media"),
      },
      fields: [
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
    {
      slug: "categories",
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: "name",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          unique: true,
        },
      ],
    },
    {
      slug: "posts",
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: "title",
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.title && !data.slug) {
              data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            }
            return data;
          },
        ],
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "excerpt",
          type: "textarea",
          required: true,
        },
        {
          name: "content",
          type: "richText",
          required: true,
        },
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          required: false,
        },
        {
          name: "cover",
          type: "relationship",
          relationTo: "media",
          required: false,
        },
        {
          name: "publishedAt",
          type: "date",
          required: true,
          admin: {
            position: "sidebar",
          },
        },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "YOUR_SECRET_HERE",
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./payload.db",
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
