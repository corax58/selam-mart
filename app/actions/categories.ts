"use server";

import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function deleteCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) throw new Error("crap");
    await prisma.category.delete({
      where: {
        id: category.id,
      },
    });
    return { message: "Category deleted successfully" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
}

export async function editCategory(category: Category) {
  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id: category.id },
    });

    if (!existingCategory) return { error: "Category was not found." };

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
    return {
      error: error instanceof Error ? error.message : "Failed to edit category",
    };
  }
}
