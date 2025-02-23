import { z } from "zod";

// Category schema
export const CategorySchema = z.object({
  name: z.string(), // Category name
  slug: z.string(), // URL-friendly identifier
  description: z.string().optional(), // Optional description
  imagePublicId: z.string().optional(), // Optional image URL
  parentId: z.string().optional(), // Optional self-referencing parent ID
});
