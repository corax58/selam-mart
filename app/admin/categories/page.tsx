"use client";

import AddCategoryDrawer from "@/components/AddCategoryModal";
import AddCategoryModal from "@/components/AddCategoryModal";
import UploadWidget from "@/components/UploadWidget";
import { CldUploadButton } from "next-cloudinary";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

const CategoriesPage = () => {
  const [visible, setVisible] = useState(false);

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Amy Elsner</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

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
