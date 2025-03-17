"use client";
import { Category, Prisma, Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";
import { ProductWithNumberPrice } from "@/types/productTypes";
import DeleteProduct from "../DeleteProduct";

const columns: ColumnDef<ProductWithNumberPrice>[] = [
  {
    accessorKey: "name",
    header: "Product name",
    cell: ({ row }) => {
      const image = row.original.images[0];
      const name = row.original.name;
      const id = row.original.id;
      return (
        <div className=" flex items-center gap-2">
          {image ? (
            <div className="size-16 overflow-clip flex items-center rounded-md">
              <Image
                width={500}
                height={500}
                src={image}
                alt="category  image"
                className="  bg-neutral-500 object-cover w-full h-full"
                quality={30}
              />
            </div>
          ) : (
            <div className=" size-16"></div>
          )}
          <Link
            href={`/admin/products/${id}`}
            className="  font-semibold tracking-wide hover:underline transition-all"
          >
            {name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) =>
      row.original.category ? row.original.category.name : "Uncategori",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "ETB",
        minimumFractionDigits: 2,
      }).format(price);

      return formattedPrice;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "description",
    header: "Description",
    maxSize: 10,
    cell: ({ row }) => {
      return (
        <p className=" max-w-96 line-clamp-3">{row.original.description}</p>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <>
          <DeleteProduct id={row.original.id} />
        </>
      );
    },
  },
];

const ProductsTable = ({
  products,
}: {
  products: ProductWithNumberPrice[];
}) => {
  return (
    <div className=" m-5 rounded border overflow-hidden">
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default ProductsTable;
