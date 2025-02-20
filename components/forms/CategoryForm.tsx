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
import { convertImageToBase64 } from "../sign-up";
import UploadWidget from "../UploadWidget";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { CldImage, CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import useCreateCategories from "@/hooks/categoryHooks/useCreateCategories";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove non-alphanumeric characters
    .replace(/--+/g, "-") // Replace multiple hyphens with a single one
    .trim();
}

const CategoryForm = () => {
  const [image, setImage] = useState("");
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: { description: "" },
  });

  const createCategories = useCreateCategories();

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    form.setValue("imageUrl", image);
    createCategories.mutate(values);
    console.log(values);
  };
  return (
    <Form {...form}>
      <UploadWidget setImage={setImage} />
      {image !== "" && (
        <CldImage
          width="100"
          height="100"
          src={image}
          sizes="100vw"
          alt="Description of my image"
          quality={10}
        />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
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
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
