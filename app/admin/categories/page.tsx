import AddCategoryModal from "@/components/ui/AddCategoryModal";
import React from "react";

const CategoriesPage = () => {
  return (
    <div className="w-full">
      <div className="bg-purple-400 h-40 flex items-center px-10 w-full ">
        <p className=" text-3xl text-white font-semibold">Categories</p>
      </div>
      <div className=" ">
        <AddCategoryModal />
      </div>
    </div>
  );
};

export default CategoriesPage;
