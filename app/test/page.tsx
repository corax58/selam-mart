"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  {
    name: "Fashion",
    slug: "fashion",
    subcategories: [
      {
        name: "Men",
        slug: "men",
        subcategories: [
          { name: "T-Shirts", slug: "tshirts" },
          { name: "Jeans", slug: "jeans" },
          { name: "Shoes", slug: "shoes" },
        ],
      },
      {
        name: "Women",
        slug: "women",
        subcategories: [
          { name: "Dresses", slug: "dresses" },
          { name: "Handbags", slug: "handbags" },
          { name: "Jewelry", slug: "jewelry" },
        ],
      },
    ],
  },
  {
    name: "Electronics",
    slug: "electronics",
    subcategories: [
      {
        name: "Phones",
        slug: "phones",
        subcategories: [
          { name: "Smartphones", slug: "smartphones" },
          { name: "Accessories", slug: "accessories" },
        ],
      },
      {
        name: "Laptops",
        slug: "laptops",
        subcategories: [
          { name: "Gaming Laptops", slug: "gaming-laptops" },
          { name: "Ultrabooks", slug: "ultrabooks" },
        ],
      },
    ],
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    subcategories: [
      {
        name: "Furniture",
        slug: "furniture",
        subcategories: [
          { name: "Sofas", slug: "sofas" },
          {
            name: "Beds",
            slug: "beds",
            subcategories: [
              { name: "Gaming Laptops", slug: "gaming-laptops" },
              { name: "Ultrabooks", slug: "ultrabooks" },
            ],
          },
        ],
      },
      {
        name: "Appliances",
        slug: "appliances",
        subcategories: [
          { name: "Refrigerators", slug: "refrigerators" },
          { name: "Microwaves", slug: "microwaves" },
        ],
      },
    ],
  },
];

type category = {
  name: string;
  slug: string;
  subcategories?: category[];
};

interface Props {
  categories: category[];
  setCategory: (value: string) => void;
}

const CategorieSelector = ({ categories, setCategory }: Props) => {
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
          <CategorieSelector
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

const TextPage = () => {
  const [category, setCategory] = useState<string>();
  console.log(category);
  return (
    <div>
      <CategorieSelector setCategory={setCategory} categories={categories} />
    </div>
  );
};

export default TextPage;
