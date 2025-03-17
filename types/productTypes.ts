import { Category, Product } from "@prisma/client";

export type ProductWithNumberPrice = Omit<Product, "price"> & {
  price: number;
  category: Category;
};
