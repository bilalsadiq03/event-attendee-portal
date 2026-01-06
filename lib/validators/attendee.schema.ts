import { z } from "zod";

export const attendeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type AttendeeFormData = z.infer<typeof attendeeSchema>;
