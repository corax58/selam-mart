import { ProductWithNumberPrice } from "@/types/productTypes";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchProducts = (query?: string) => {
  const url = query ? `/api/products?category=${query}` : "/api/products";
  return useQuery({
    queryFn: () =>
      axios.get<ProductWithNumberPrice[]>(url).then((res) => res.data),
    queryKey: ["products", query],
    enabled: query !== "",
    staleTime: 1000 * 60 * 5,
  });
};

export default useFetchProducts;
