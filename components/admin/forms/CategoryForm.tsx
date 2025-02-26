"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateCategories from "@/hooks/categoryHooks/useCreateCategories";
import { CategorySchema } from "@/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { AxiosError } from "axios";
import { Camera } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Loader from "../../Loader";
import { Textarea } from "../../ui/textarea";
import UploadWidget from "../../UploadWidget";
import { useQueryClient } from "@tanstack/react-query";
import { generateSlug, getLastPathSegment } from "@/utils/stringUtils";
import { usePathname } from "next/navigation";
import useEditCategory from "@/hooks/categoryHooks/useEditCategory";

interface Props {
  setOpen: (value: boolean) => void;
  category?: Category;
  parentId?: string;
}

const CategoryForm = ({ setOpen, category, parentId }: Props) => {
  const [imagePublicId, setImagePublicId] = useState(
    category?.imagePublicId ? category.imagePublicId : ""
  );
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const createCategories = useCreateCategories();
  const editCategory = useEditCategory();

  const defaultValues = category
    ? {
        name: category?.name,
        slug: category?.slug,
        description: category?.description || "",
        imagePublicId: category?.imagePublicId || "",
        parentId: category?.parentId || "",
      }
    : { description: "", parentId };
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    form.setValue("imagePublicId", imagePublicId);
    console.log(values);
    if (category) {
      const updatedCategory = { ...category, ...values };
      editCategory.mutate(updatedCategory);
    } else {
      createCategories.mutate(values);
    }
  };

  useEffect(() => {
    if (createCategories.isSuccess || editCategory.isSuccess) {
      const lastPath = getLastPathSegment(pathname);
      const queryKeyItem =
        lastPath == "categories"
          ? "main categories"
          : `${lastPath} subcategories`;

      if (category) {
        toast.success("Category edited successfully.");
      } else {
        toast.success("Category created successfully.");
      }
      queryClient.invalidateQueries({ queryKey: [queryKeyItem] });
      setOpen(false);
    }
    if (createCategories.isError || editCategory.isError) {
      if (category) {
        toast.error(editCategory.error?.message);
      } else {
        const axiosError = createCategories.error as AxiosError<{
          message: string;
        }>;
        toast.error(axiosError.response?.data.message);
      }
    }
  }, [
    createCategories.isSuccess,
    createCategories.isError,
    editCategory.isSuccess,
    editCategory.isError,
  ]);

  return (
    <Form {...form}>
      <div className="flex gap-5 items-center">
        <UploadWidget setImagePublicId={setImagePublicId} />
        {imagePublicId !== "" ? (
          <div className="size-24 overflow-clip flex items-center rounded-md">
            <CldImage
              width={500}
              height={500}
              src={imagePublicId}
              alt="category  image"
              className="  bg-neutral-400 object-cover w-full h-full"
              quality={10}
            />
          </div>
        ) : (
          <div className="size-[100px] bg-slate-200 flex justify-center items-center rounded hover:bg-slate-100">
            <Camera size={30} strokeWidth={3} />
          </div>
        )}
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="w-min">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="name"
                  {...field}
                  onChange={(e) => {
                    const slug = generateSlug(e.target.value);
                    field.onChange(e);
                    form.setValue("slug", slug);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <FormLabel className="w-max">URL Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="slug"
                  {...field}
                  onChange={(e) => {
                    const slug = generateSlug(e.target.value);
                    field.onChange(e);
                    form.setValue("slug", slug);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="w-min">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" h-mx w-28">
          {createCategories.isPending ? (
            <Loader />
          ) : category ? (
            "Save"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
