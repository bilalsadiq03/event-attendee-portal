"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    attendeeSchema,
    AttendeeFormData
} from "@/lib/validators/attendee.schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAttendee } from "@/lib/api";
import { toast } from "sonner";

export default function RegisterAttendeeForm({
  eventId,
}: {
  eventId: string;
}) {
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerAttendee,

    onMutate: async (newAttendee) => {
      await queryClient.cancelQueries({ queryKey: ["event", eventId] });

      const previousEvent = queryClient.getQueryData(["event", eventId]);

      queryClient.setQueryData(["event", eventId], (old: any) => ({
        ...old,
        attendees: [
          ...old.attendees,
          { id: "temp-id", ...newAttendee },
        ],
      }));

      return { previousEvent };
    },

    onError: (_err, _newAttendee, context) => {
      queryClient.setQueryData(["event", eventId], context?.previousEvent);
      toast.error("Failed to register attendee");
    },

    onSuccess: () => {
      toast.success("Attendee registered successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
  });

  const onSubmit = async (data: AttendeeFormData) => {
    mutation.mutate({ ...data, eventId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input disabled={mutation.isPending} placeholder="Name" {...register("name")} />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}

      <Input disabled={mutation.isPending} placeholder="Email" {...register("email")} />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Registering..." : "Register Attendee"}
      </Button>
    </form>
  );
}