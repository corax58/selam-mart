import { number, z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  details: z.string(),
  price: z.coerce.number(),
  stock: z.coerce
    .number()
    .int({ message: "Stock should only be a whole number" })
    .min(0, { message: "Stock cant be below 0" }),
  categoryId: z.string(),
  images: z.array(z.string()), // Assuming images is an array of URLs
});
