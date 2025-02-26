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
import { Button } from "../ui/button";
import { Category } from "@prisma/client";
import { Edit } from "lucide-react";

const AddCategoryModal = ({
  category,
  parentId,
}: {
  category?: Category;
  parentId?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          {category ? <Edit /> : parentId ? "Add sub category" : "Add category"}
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="shadow-2xl "
      >
        <DialogHeader>
          <DialogTitle className=" w-max">
            {category
              ? "Edit Category"
              : parentId
              ? "New sub category"
              : "New category"}
          </DialogTitle>
          <CategoryForm
            setOpen={setOpen}
            category={category}
            parentId={parentId}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
