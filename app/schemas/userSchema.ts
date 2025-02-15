import { z } from "zod";

export const userSchema = z.object({
  // Password: Cannot be empty or only whitespace
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^(?!\s*$).+$/, "Name cannot be only white spaces"), // name must have at least one non-whitespace character
  password: z
    .string()
    .min(1, "Password is required")
    .regex(/^(?!\s*$).+$/, "Password cannot be only white spaces"), // Password must have at least one non-whitespace character
});
