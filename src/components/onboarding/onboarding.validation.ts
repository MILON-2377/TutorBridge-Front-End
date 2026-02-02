import * as z from "zod";

export const tutorBioSchema = z.object({
  bio: z.string().min(50, "Bio must be at least 50 characters to help students trust you."),
  hourlyRate: z.number().min(5, "Minimum hourly rate is $5").max(500),
  experienceYears: z.number().min(0, "Experience cannot be negative").max(50),
  languages: z.array(z.string()).min(1, "Please add at least one language"), 
});

export type TutorBioInput = z.infer<typeof tutorBioSchema>;