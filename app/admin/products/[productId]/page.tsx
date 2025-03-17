import ProductsTable from "@/components/admin/tables/ProductsTable";
import ImageSlider from "@/components/ImageSlider";
import StarRating from "@/components/StarRating";
import { prisma } from "@/lib/prisma";
import React from "react";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  return (
    <div className=" w-full h-full bg-slate-100 p-10 flex">
      <div className=" w-1/2 bg-white p-2 rounded">
        <ImageSlider productImages={product?.images!} />
      </div>
      <div className=" w-1/2 h-96 bg-white ">
        <StarRating rating={3.2} />
      </div>
    </div>
  );
};

export default ProductPage;
