import z from "zod";
import { GalleryItem } from "../../types/GalleryTypes";
import { GalleryItemSchema } from "../validators/gallerySchema";

export const GALLERY_TAG = "gallery";
export const GALLERY_BY_SLUG = "gallerybyslug";

export async function getAllGallery(): Promise<GalleryItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH || ""}/gallery/all`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 60, tags: [GALLERY_TAG] },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load gallery: ${res.status} ${text}`);
  }

  const json = await res.json();
  const responseSchema = z.object({
    message: z.string(),
    data: z.array(GalleryItemSchema),
  });

  const validated = responseSchema.safeParse(json);
  if (!validated.success) {
    console.error("Zod validation error:", validated.error.format());
    return [];
  }

  return validated.data.data;
}

export async function getGallerybySlug(slug: string): Promise<GalleryItem> {
  "use cache"
  const gallerybySlug = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_PATH || ""}/gallery/${slug}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 70, tags: [`gallery-${slug}`] },
    }
  );
  if (!gallerybySlug.ok) {
    const text = gallerybySlug.text();
    throw new Error(
      `failed to get gallery by slug: ${gallerybySlug.status} ${text}`
    );
  }

  const json = await gallerybySlug.json();
  const responseSchema = z.object({
    message: z.string(),
    data: GalleryItemSchema,
  });

  const validated = responseSchema.safeParse(json);

  if (!validated.success) {
    console.log("zod validation error", validated.error.format());
    return {
      id: 0,
      coverImage: "",
      description: "",
      excerpt: "",
      images: [],
      imageAlt: "",
      metaDescription: "",
      metaKeywords: "",
      metaTitle: "",
      slug: "",
      title: "",
    };
  }
  return validated.data.data;
}
