import * as z from "zod";

export const availabilitySchema = z
  .object({
    dayOfWeek: z.enum([
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]),
    startMinute: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
      .transform((time) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      }),
    endMinute: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
      .transform((time) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      }),
    isActive: z.boolean().optional().default(true),
  })
  .refine(
    (data) => {
      return data.startMinute < data.endMinute;
    },
    {
      message: "End time must be after start time",
      path: ["endMinute"],
    },
  );

export type AvailabilityFormInput = z.input<typeof availabilitySchema>;
export type AvailabilityPayload = z.output<typeof availabilitySchema>;
