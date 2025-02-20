"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "./forms/CategoryForm";
import { useState } from "react";

const AddCategoryModal = () => {
  const [categoryImage, setCategoryImage] = useState("");

  return (
    <Dialog modal={false}>
      <DialogTrigger>Add a category</DialogTrigger>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="shadow-2xl "
      >
        {categoryImage}
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <CategoryForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
