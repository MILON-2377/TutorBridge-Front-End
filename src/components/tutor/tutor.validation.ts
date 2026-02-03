import * as z from "zod";

export const availabilitySchema = z.object({
  dayOfWeek: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),
  startTime: z.string(),
  endTime: z.string(),
  isActive: z.boolean(),
});

export type AvailabilityInput = z.infer<typeof availabilitySchema>;
