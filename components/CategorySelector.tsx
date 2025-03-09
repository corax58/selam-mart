import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { nestedCategory } from "@/app/types/utils";
import { useFetchCategories } from "@/hooks/categoryHooks/useFetchCategories";
import Loader from "./Loader";

interface Props {
  categories: nestedCategory[];
  setCategory: (value: string) => void;
  setCategoryError: (value: boolean) => void;
}
const CategorySelector = ({
  categories,
  setCategory,
  setCategoryError,
}: Props) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  return (
    <div className=" flex flex-col gap-5  mt-2">
      <Select
        onValueChange={(value) => {
          setCategoryError(false);
          setCategory("");
          if (
            categories.find((category) => category.id == value)?.subcategories
              .length == 0
          ) {
            console.log("main category");
            setSelectedCategoryId(value);
            setCategory(value);
          } else {
            console.log("sub category");
            setSelectedCategoryId(value);
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category, index) => (
            <SelectItem value={category.id} key={index}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCategoryId &&
        categories.find((category) => category.id == selectedCategoryId)
          ?.subcategories.length != 0 && (
          <CategorySelector
            setCategory={setCategory}
            setCategoryError={setCategoryError}
            categories={
              categories.find((category) => category.id == selectedCategoryId)
                ?.subcategories!
            }
          />
        )}
    </div>
  );
};

export default CategorySelector;
