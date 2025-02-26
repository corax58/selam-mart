import { deleteCategory } from "@/app/actions/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function (slug?: string) {
  const queryClient = useQueryClient(); // React Query cache manager

  const queryKeyItem = slug ? `${slug} subcategories` : "main categories";
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeyItem] }); // Refresh categories list
    },
  });
}
