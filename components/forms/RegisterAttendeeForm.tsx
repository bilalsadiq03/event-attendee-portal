"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    attendeeSchema,
    AttendeeFormData
} from "@/lib/validators/attendee.schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export default function RegisterAttendeeForm({
  eventId,
}: {
  eventId: string;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
  });

  const onSubmit = async (data: AttendeeFormData) => {
    setLoading(true);
    await fetch("/api/attendees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, eventId }),
    });
    setLoading(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="Name" {...register("name")} />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}

      <Input placeholder="Email" {...register("email")} />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register Attendee"}
      </Button>
    </form>
  );
}