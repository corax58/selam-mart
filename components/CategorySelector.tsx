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

interface Props {
  categories: nestedCategory[];
  setCategory: (value: string) => void;
}
const CategorySelector = ({ categories, setCategory }: Props) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>();

  return (
    <div className=" flex flex-col gap-5 ">
      <Select
        onValueChange={(value) => {
          if (
            categories.find((category) => category.slug == value)?.subcategories
          ) {
            setSelectedCategorySlug(value);
          } else {
            setCategory(value);
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category, index) => (
            <SelectItem value={category.slug} key={index}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCategorySlug &&
        categories.find((category) => category.slug == selectedCategorySlug)
          ?.subcategories && (
          <CategorySelector
            setCategory={setCategory}
            categories={
              categories.find(
                (category) => category.slug == selectedCategorySlug
              )?.subcategories!
            }
          />
        )}
    </div>
  );
};

export default CategorySelector;
