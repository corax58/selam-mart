"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "@/schemas/productSchema";
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
import { Textarea } from "@/components/ui/textarea";
import EditorToolbar from "../EditorToolbar";
import { EditorContent } from "@tiptap/react";
import useCustomEditor from "@/hooks/useCustomEditor";
import ProductImageUploader from "../ProductImageUploader";
import { useFetchCategories } from "@/hooks/categoryHooks/useFetchCategories";
import CategorySelector from "@/components/CategorySelector";
import Loader from "@/components/Loader";
import TipTap from "../TipTap";

const ProductForm = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  const [productImages, setProductImages] = useState<string[]>([]);

  const [category, setCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState(false);
  const {
    data: categories,
    isLoading,
    error,
    isSuccess,
  } = useFetchCategories();

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    if (category == "") {
      setCategoryError(true);
      return;
    }
    const data = { ...values, productImages, category };
    console.log(data);
  };

  return (
    <Form {...form}>
      <div className=" w-full flex p-5 gap-5">
        <div className=" w-1/2">
          <ProductImageUploader
            productImages={productImages}
            setProductImages={setProductImages}
          />
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-1/2 flex flex-col gap-8 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel className={categoryError ? "text-red-500" : ""}>
              Category
            </FormLabel>
            {isLoading && <Loader />}
            {isSuccess && (
              <CategorySelector
                setCategory={setCategory}
                categories={categories}
                setCategoryError={setCategoryError}
              />
            )}
            {!isLoading && !isSuccess && (
              <p className="text-red-500">Error fetching categories</p>
            )}
            {categoryError && (
              <p className="text-red-500">Please choose a category</p>
            )}
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <TipTap details={""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input step={"1"} type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
};

export default ProductForm;
