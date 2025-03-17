import { number, z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  details: z.string().min(1, "Details are required"),
  price: z.coerce
    .number({ message: "Price is required" })
    .positive({ message: "Price cant be below 0" }),
  stock: z.coerce
    .number({ message: "Stock is required" })
    .int({ message: "Stock should only be a whole number" })
    .positive({ message: "Stock cant be below 0" }),
});

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  details: z.string().min(1, "Details are required"),
  price: z.coerce
    .number({ message: "Price is required" })
    .positive({ message: "Price cant be below 0" }),
  stock: z.coerce
    .number({ message: "Stock is required" })
    .int({ message: "Stock should only be a whole number" })
    .positive({ message: "Stock cant be below 0" }),
  categoryId: z.string({ message: "Invalid category ID" }),
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1, "At least one image is required"),
});
