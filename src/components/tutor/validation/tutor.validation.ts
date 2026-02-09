import * as z from "zod";

export const UpdateTutorProfileSchema = z.object({
  name: z.string().min(2, "Name is too short").optional(),
  title: z.string().min(5, "Professional title is required").optional(),
  bio: z.string().min(50, "Bio should be at least 50 characters").optional(),
  categoryId: z.array(z.string()).min(1, "Select at least one subject").optional(),
});

export type UpdateTutorProfileInput = z.infer<typeof UpdateTutorProfileSchema>;
