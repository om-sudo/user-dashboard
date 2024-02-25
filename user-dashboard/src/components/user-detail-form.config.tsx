import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),

    email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),

    country: z.string().min(2, {
        message: "Country name must be at least 2 characters.",
      }),
  })
  