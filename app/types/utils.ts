import { Prisma } from "@prisma/client";

export type nestedCategory = {
  name: string;
  id: string;
  slug: string;
  description: string | null;
  imagePublicId: string | null;
  parentId: string | null;
  subcategories: nestedCategory[];
  createdAt: Date;
  updatedAt: Date;
};
