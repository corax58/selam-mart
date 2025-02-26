import { api } from "@/lib/axios";
import { Category, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type subCategories = Prisma.CategoryGetPayload<{
  include: { subcategories: true };
}>;

export function useFetchSubCategories(slug: string) {
  return useQuery({
    queryFn: () =>
      api
        .get<subCategories>("/categories" + `/${slug}`)
        .then((res) => res.data),

    queryKey: [`${slug} subcategories`],
  });
}
