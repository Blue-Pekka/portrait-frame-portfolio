import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  subject: z.string().trim().max(150, "Subject must be under 150 characters").default(""),
  message: z.string().trim().min(1, "Please write a message").max(2000, "Message must be under 2000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
