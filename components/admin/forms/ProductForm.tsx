"use client";
import { createProduct } from "@/app/actions/products";
import CategorySelector from "@/components/CategorySelector";
import Loader from "@/components/Loader";
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
import { Textarea } from "@/components/ui/textarea";
import { useFetchCategories } from "@/hooks/categoryHooks/useFetchCategories";
import { productFormSchema } from "@/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ProductImageUploader from "../ProductImageUploader";
import TipTap from "../TipTap";

const ProductForm = () => {
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productImageError, setProductImageError] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
  });

  const { data: categories, isLoading, isSuccess } = useFetchCategories();

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    if (!category.trim()) {
      setCategoryError(true);
      return;
    }
    if (productImages.length === 0) {
      return setProductImageError(true);
    }
    const data = { ...values, images: productImages, categoryId: category };

    startTransition(async () => {
      try {
        const result = await createProduct(data);
        if (result.error) {
          toast.error(result.error);
        } else if (result.success) {
          toast.success(result.message || "Product created successfully.");
        }
      } catch (error) {
        toast.error("Unexpected error occured");
        console.error(error);
      }
    });
  };

  return (
    <Form {...form}>
      <div className=" w-full flex p-5 gap-5">
        <div className=" w-1/2">
          {productImageError && (
            <p className=" text-red-500 text-sm">Upload atleast one image.</p>
          )}
          <ProductImageUploader
            productImages={productImages}
            setProductImages={setProductImages}
            setProductImageError={setProductImageError}
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
            {isLoading && (
              <div className=" flex justify-center items-center w-44 h-10 rounded-md border mt-2">
                <Loader />
              </div>
            )}
            {isSuccess && (
              <CategorySelector
                setCategory={setCategory}
                categories={categories}
                setCategoryError={setCategoryError}
              />
            )}
            {!isLoading && !isSuccess && (
              <>
                <div className=" flex justify-center items-center w-44 h-10 rounded-md border border-red-500 mt-2"></div>
                <p className="text-red-500 text-sm">
                  Error fetching categories
                </p>
              </>
            )}
            {categoryError && (
              <p className="text-red-500 text-sm">Please choose a category</p>
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

          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader /> : "Add product"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default ProductForm;
