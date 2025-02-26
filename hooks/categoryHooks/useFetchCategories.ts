import { api } from "@/lib/axios";
import { Category, Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchCategories() {
  return useQuery({
    queryFn: () => api.get("/categories").then((res) => res.data),

    queryKey: ["main categories"],
  });
}
