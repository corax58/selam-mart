"use server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas/productSchema";
import { z } from "zod";

export async function createProduct(product: z.infer<typeof productSchema>) {
  const validation = productSchema.safeParse(product);
  if (!validation.success) {
    return {
      error: "Validation error",
      errorDetails: validation.error.format(),
    };
  }
  try {
    await prisma.product.create({ data: product });
    return { success: true, message: "Product created" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured.",
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new Error("crap");
    await prisma.product.delete({
      where: {
        id: product.id,
      },
    });
    return { message: "Product deleted successfully" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
}
