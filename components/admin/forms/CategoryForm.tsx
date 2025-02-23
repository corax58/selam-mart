"use client";

import { CategorySchema } from "@/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { convertImageToBase64 } from "../../sign-up";
import UploadWidget from "../../UploadWidget";
import { useEffect, useState } from "react";
import { Textarea } from "../../ui/textarea";
import { CldImage, CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import useCreateCategories from "@/hooks/categoryHooks/useCreateCategories";
import Loader from "../../Loader";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { AxiosError } from "axios";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove non-alphanumeric characters
    .replace(/--+/g, "-") // Replace multiple hyphens with a single one
    .trim();
}

const CategoryForm = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const [imagePublicId, setImagePublicId] = useState("");
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: { description: "" },
  });

  const createCategories = useCreateCategories();

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    form.setValue("imagePublicId", imagePublicId);
    createCategories.mutate(values);
  };

  useEffect(() => {
    if (createCategories.isSuccess) {
      toast.success("Category created");
      setOpen(false);
    }
    if (createCategories.isError) {
      const axiosError = createCategories.error as AxiosError<{
        message: string;
      }>;
      toast.error(axiosError.response?.data.message);
    }
  }, [createCategories.isSuccess, createCategories.isError]);

  return (
    <Form {...form}>
      <div className="flex gap-5 items-center">
        <UploadWidget setImagePublicId={setImagePublicId} />
        {imagePublicId !== "" ? (
          <div className="size-[100px] bg-slate-200">
            <CldImage
              width="100"
              height="100"
              src={imagePublicId}
              sizes="100vw"
              alt="Description of my image"
              className=" object-contain"
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
          {createCategories.isPending ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
