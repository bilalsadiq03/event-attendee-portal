import { z } from "zod";

export const eventSchema = z.object({
    title: z.string().min(3, "Title must be atleast 3 characters"),
    description: z.string().min(10, "Decsription must be atleast 10 characters"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)),{
        message: "Invalid date",
    }),
    capacity: z.coerce.number().min(1, "Capacity must be atleast 1"),
});

export type EventFormData = z.infer<typeof eventSchema>