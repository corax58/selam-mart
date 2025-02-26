import { api } from "@/lib/axios";
import { CategorySchema } from "@/schemas/categorySchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export default function () {
  return useMutation({
    mutationFn: (data: z.infer<typeof CategorySchema>) =>
      api.post("/categories", data).then((res) => res.data),
  });
}
