import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    if (category === "") {
      return NextResponse.json(
        { error: "Category can't be empty" },
        { status: 400 }
      );
    }
    let whereCondition = {};

    switch (category) {
      case null:
        break;

      case "categorized":
        whereCondition = { categoryId: { not: null } };
        break;
      case "uncategorized":
        whereCondition = { categoryId: null };
        break;
      default:
        whereCondition = { category: { slug: category } };
    }

    // console.log(whereCondition);
    const products = await prisma.product.findMany({
      where: whereCondition,
      include: { category: true },
    });

    const serializedProducts = products.map((product) => ({
      ...product,
      price: product.price.toNumber() ?? 0,
    }));
    return NextResponse.json({ products: serializedProducts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
