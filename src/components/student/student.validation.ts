import * as z from "zod";


export const ProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    image: z.string().optional(),
});


export type ProfileInput = z.infer<typeof ProfileSchema>;