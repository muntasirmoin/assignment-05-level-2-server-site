import { z } from "zod";

const slotValidationSchema = z.object({
  body: z.object({
    service: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    isBooked: z
      .enum(["available", "booked", "canceled"])
      .optional()
      .default("available"),
  }),
});

export const slotValidation = {
  slotValidationSchema,
};
