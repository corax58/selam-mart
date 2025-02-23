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
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add a category</DialogTrigger>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="shadow-2xl "
      >
        {categoryImage}
        <DialogHeader>
          <DialogTitle className=" w-max">New Category</DialogTitle>
          <CategoryForm setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
