"use client";

import AddCategoryModal from "@/components/admin/AddCategoryModal";
import CategoriesTable from "@/components/admin/tables/CategoriesTable";
import Loader from "@/components/Loader";
import { useFetchCategories } from "@/hooks/categoryHooks/useFetchCategories";

const CategoriesPage = () => {
  const { data: categories, isLoading, error } = useFetchCategories();

  if (isLoading) <Loader />;
  if (error) <p className="text-red-500">Something happened</p>;
  if (categories)
    return (
      <div className="w-full">
        <div className=" flex justify-between p-4  border-b items-center h-20">
          <p className=" text-lg font-bold">Main categories</p>
          <AddCategoryModal />
        </div>
        <CategoriesTable data={categories} />
      </div>
    );
};

export default CategoriesPage;
