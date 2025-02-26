"use client";
import { useFetchCategories } from "@/hooks/categoryHooks/useFetchCategories";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CldImage } from "next-cloudinary";
import Loader from "../../Loader";
import AddCategoryModal from "../AddCategoryModal";
import { DataTable } from "../data-table";
import DeleteCategory from "./DeleteCategory";
import Descriptiontooltip from "./Descriptiontooltip";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { getLastPathSegment } from "@/utils/stringUtils";

const CategoriesTable = ({ data }: { data: Category[] }) => {
  const pathname = usePathname();

  const columns: ColumnDef<Category>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Category",
        cell: ({ row }) => {
          const imagePublicId = row.original.imagePublicId;
          const title = row.original.name;
          const slug = row.original.slug;
          return (
            <div className=" flex items-center gap-2">
              {imagePublicId ? (
                <div className="size-16 overflow-clip flex items-center rounded-md">
                  <CldImage
                    width={500}
                    height={500}
                    src={imagePublicId}
                    alt="category  image"
                    className="  bg-neutral-500 object-cover w-full h-full"
                    quality={30}
                  />
                </div>
              ) : (
                <div className=" size-16"></div>
              )}
              <Link
                href={pathname + `/${slug}`}
                className="  font-semibold tracking-wide hover:underline transition-all"
              >
                {title}
              </Link>
            </div>
          );
        },
      },
      {
        accessorKey: "slug",
        header: "Slug",
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          const desc = row.original.description;
          if (desc) return <Descriptiontooltip desc={desc} />;
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const lastPath = getLastPathSegment(pathname);
          const slug = lastPath == "categories" ? undefined : lastPath;

          return (
            <div className="  flex gap-2">
              <AddCategoryModal category={row.original} />
              <DeleteCategory id={row.original.id} slug={slug} />
            </div>
          );
        },
      },
    ],
    [pathname]
  );

  return (
    <div className="  border rounded-xl m-4 overflow-clip">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CategoriesTable;
