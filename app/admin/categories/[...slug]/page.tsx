"use client";
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import CategoriesTable from "@/components/admin/tables/CategoriesTable";
import Loader from "@/components/Loader";
import { useFetchSubCategories } from "@/hooks/categoryHooks/useFetchSubcategories";
import { CldImage } from "next-cloudinary";
import React from "react";

const Subcategories = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = React.use(params);

  const {
    data: parent,
    error,
    isLoading,
  } = useFetchSubCategories(slug[slug.length - 1]);

  if (isLoading) <Loader />;
  if (error) <p className="text-red-500">Something happened</p>;
  if (parent)
    return (
      <div>
        <div className=" flex justify-between p-4  border-b items-center h-20">
          <div className=" flex items-center gap-2 h-full w-full">
            {parent.imagePublicId && (
              <div className="h-full w-full overflow-clip flex items-center rounded-md">
                <CldImage
                  width={500}
                  height={500}
                  src={parent.imagePublicId}
                  alt="category  image"
                  className="  bg-neutral-500 object-cover w-full h-full"
                  quality={30}
                />
              </div>
            )}
            <p className="  font-bold text-lg">{parent.name}</p>
          </div>
          <AddCategoryModal parentId={parent.id} />
        </div>
        <CategoriesTable data={parent.subcategories} />
      </div>
    );
};

export default Subcategories;
