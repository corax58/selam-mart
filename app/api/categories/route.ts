import { prisma } from "@/lib/prisma";
import { CategorySchema } from "@/schemas/categorySchema";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const updateImageTags = async (imageId: string) => {
  try {
    await cloudinary.uploader.replace_tag("confirmed-category", [imageId]);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const data = CategorySchema.parse(body);
    if (!data) throw Error("Invalid data");

    console.log(data);
    const updatedTags = await updateImageTags(body.imagePublicId);
    if (!updatedTags.success) throw Error("Image tag update failed");

    const existingCategory = await prisma.category.findFirst({
      where: {
        slug: data.slug,
      },
    });

    if (existingCategory)
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    const category = await prisma.category.create({
      data,
    });

    return NextResponse.json(category, { status: 200 });
  } catch (Error) {
    console.log(Error);
    return NextResponse.json({ Error }, { status: 404 });
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 404 });
  }
}
