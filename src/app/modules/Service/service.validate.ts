import { z } from "zod";

const serviceValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    duration: z.number().positive(),
    isDeleted: z.boolean(),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    duration: z.number().positive().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const serviceValidation = {
  serviceValidationSchema,
  updateServiceValidationSchema,
};
