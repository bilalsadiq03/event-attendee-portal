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
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEvent } from "@/lib/api";


export default function CreateEventForm () {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            reset();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema)
    })

    const onSubmit = (data: EventFormData) => {
        mutation.mutate({ ...data, capacity: Number(data.capacity) })
        toast.success("Event created successfully!");
        reset();
        redirect("/events")
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Input disabled={mutation.isPending} placeholder="Event Title" {...register("title")} />
                { errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
            </div>

            <div>
                <Textarea disabled={mutation.isPending} placeholder="Description" {...register("description")} />
                {errors.description && (
                    <p className="text-sm text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div>
                <Input disabled={mutation.isPending} type="date" {...register("date")} />
                {errors.date && (
                    <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
            </div>

            <div>
                <Input
                    disabled={mutation.isPending}
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

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Creating..." : "Create Event"}
            </Button>

        </form>
    )
}