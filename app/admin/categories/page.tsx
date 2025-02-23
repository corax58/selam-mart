"use client";

import AddCategoryDrawer from "@/components/admin/AddCategoryModal";
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import UploadWidget from "@/components/UploadWidget";
import { CldUploadButton } from "next-cloudinary";
import Link from "next/link";

import React, { useState } from "react";

const CategoriesPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      <div className=" ">
        <AddCategoryModal />
      </div>
    </div>
  );
};

export default CategoriesPage;
