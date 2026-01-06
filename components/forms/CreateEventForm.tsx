"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventFormData } from "@/lib/validators/event.schema";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";


export default function CreateEventForm () {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema)
    })

    const onSubmit = async (data: EventFormData) => {
        setLoading(true);
        await fetch("/api/events",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                capacity: Number(data.capacity)
            }),
        });
        toast.success("Event created successfully!");
        setLoading(false);
        reset();
        redirect("/events")
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Input placeholder="Event Title" {...register("title")} />
                { errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
            </div>

            <div>
                <Textarea placeholder="Description" {...register("description")} />
                {errors.description && (
                    <p className="text-sm text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div>
                <Input type="date" {...register("date")} />
                {errors.date && (
                    <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
            </div>

            <div>
                <Input
                    type="number"
                    placeholder="Capacity"
                    {...register("capacity", { valueAsNumber: true })}
                />
                {errors.capacity && (
                    <p className="text-sm text-red-500">
                        {errors.capacity.message}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Event"}
            </Button>

        </form>
    )
}