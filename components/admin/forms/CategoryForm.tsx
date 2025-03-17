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
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Loader from "../../Loader";
import { Textarea } from "../../ui/textarea";
import CategoryImageUploadWidget from "../../CategoryImageUploadWidget";
import { useQueryClient } from "@tanstack/react-query";
import { generateSlug, getLastPathSegment } from "@/utils/stringUtils";
import { usePathname } from "next/navigation";
import useEditCategory from "@/hooks/categoryHooks/useEditCategory";
import { editCategory } from "@/app/actions/categories";

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

  const [isPending, startTransition] = useTransition();

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
    const data = { ...values, imagePublicId };
    console.log(imagePublicId);
    if (category) {
      const updatedCategory = { ...category, ...values };

      try {
        startTransition(async () => {
          const result = await editCategory(updatedCategory);
          if (result.error) {
            toast.error(result.error);
          } else if (result.message) {
            toast.success(result.message);
            setOpen(false);
            queryClient.invalidateQueries();
          }
        });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured.");
      }
    } else {
      createCategories.mutate(data);
    }
  };

  useEffect(() => {
    if (createCategories.isSuccess) {
      toast.success("Category created successfully.");

      queryClient.invalidateQueries();
      setOpen(false);
    }

    if (createCategories.isError) {
      const axiosError = createCategories.error as AxiosError<{
        message: string;
      }>;
      const errorMessage =
        axiosError.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }, [
    createCategories.isSuccess,
    createCategories.isError,
    queryClient,
    setOpen,
  ]);

  return (
    <Form {...form}>
      <div className="flex gap-5 items-center">
        <CategoryImageUploadWidget setImagePublicId={setImagePublicId} />
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
        <Button
          type="submit"
          className=" h-mx w-28"
          disabled={createCategories.isPending || isPending}
        >
          {createCategories.isPending || isPending ? (
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
