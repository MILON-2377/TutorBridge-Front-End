import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export type SignInInput = z.input<typeof signInSchema>;
export type SignInOutput = z.output<typeof signInSchema>;
