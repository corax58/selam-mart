"use server";

import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function deleteCategory(id: string) {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) return { message: "No category by that id" };

  await prisma.category.delete({ where: { id } });

  return { message: "Category deleted" };
}

export async function editCategory(category: Category) {
  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id: category.id },
    });

    if (!existingCategory) throw Error("Category not found");

    const { name, slug, imagePublicId, description } = category;

    await prisma.category.update({
      where: { id: existingCategory.id },
      data: {
        name,
        slug,
        imagePublicId,
        description,
      },
    });

    return { message: "Category edited successfully. " };
  } catch (error: unknown) {
    console.error("Error editing category:", error);
    if (error instanceof Error) {
      return { message: "Failed to delete category", error: error.message };
    } else {
      return { message: "Unknown error occured." };
    }
  }
}
