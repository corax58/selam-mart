import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ProductsPage = () => {
  return (
    <div>
      <Link href={"products/new"}>
        <Button>New product</Button>
      </Link>
    </div>
  );
};

export default ProductsPage;
