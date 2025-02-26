import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { slug: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const { slug } = await params;

  console.log(slug);

  try {
    const parent = await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        subcategories: true,
      },
    });
    if (!parent)
      return NextResponse.json(
        { Error: "Parent doesnt exist" },
        { status: 404 }
      );

    return NextResponse.json(parent);
  } catch (Error) {}

  return NextResponse.json({ slug });
}
