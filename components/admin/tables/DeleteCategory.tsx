"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useDeleteCategories from "@/hooks/categoryHooks/useDeleteCategories";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import React, { useEffect } from "react";
import Loader from "@/components/Loader";

const DeleteCategory = ({ id, slug }: { id: string; slug?: string }) => {
  const { mutate, isPending, isError, isSuccess } = useDeleteCategories(slug);

  useEffect(() => {
    if (isSuccess) toast.success("Category deleted.");
    if (isError) toast.error("Category deletion failed.");
  }, [isSuccess, isError]);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"}>
          {isPending ? <Loader /> : <Trash />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently this category
            and remove its subcategories.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategory;
