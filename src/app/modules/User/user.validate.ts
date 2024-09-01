import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string(),
    phone: z.string(),
    role: z.enum(["admin", "user"]),
    address: z.string(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const userValidation = {
  userValidationSchema,
  loginValidationSchema,
};
