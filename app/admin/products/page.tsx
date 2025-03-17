"use client";
import ProductsTable from "@/components/admin/tables/ProductsTable";
import { Button } from "@/components/ui/button";
import useFetchProducts from "@/hooks/productHooks/useFetchProducts";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React, { Suspense } from "react";

const ProductsPage = () => {
  const { data: products } = useFetchProducts();
  console.log(products);
  return (
    <div>
      <Link href={"products/new"}>
        <Button>New product</Button>
      </Link>
      <Suspense fallback={<p>Loading products...</p>}>
        {products && <ProductsTable products={products} />}
      </Suspense>
    </div>
  );
};

export default ProductsPage;
