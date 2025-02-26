import { editCategory } from "@/app/actions/categories";
import { useMutation } from "@tanstack/react-query";

export default function () {
  return useMutation({
    mutationFn: editCategory,
  });
}
