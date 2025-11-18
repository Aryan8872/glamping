import z from "zod";

export const GalleryItemSchema = z.object({
  id:z.number(),
  title: z.string(),
  coverImage: z.string(),
  excerpt: z.string(),
  description: z.string(),
  slug: z.string(),
  images: z.array(z.string()),
  imageAlt: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  metaKeywords: z.string(),
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;