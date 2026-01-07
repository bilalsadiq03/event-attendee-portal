"use client";

import { use } from "react";
import RegisterAttendeeForm from "@/components/forms/RegisterAttendeeForm";
import { fetchEventById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { EventDetailsSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";

interface PageProps {
  params: Promise<{ id: string }>;
}


export default function EventDetailsPage({params}: PageProps) {
    const { id } = use(params);  
    const { data, isLoading, isError } = useQuery({
      queryKey: ["event", id],
      queryFn: () => fetchEventById(id)
    })

    if (isLoading) return <EventDetailsSkeleton />;
    if (isError) return <ErrorState message="Event not found" />;
    

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p>{data.description}</p>
      <p className="text-sm text-muted-foreground">
        {new Date(data.date).toDateString()}
      </p>

      <div className="border-t pt-4">
        <h2 className="text-lg font-medium mb-2">Attendees</h2>
        {data.attendees?.length === 0 ? (
          <p className="text-muted-foreground">No attendees yet.</p>
        ) : (
          <ul className="list-disc pl-4">
            {data.attendees?.map((a: any) => (
              <li key={a.id}>{a.name} ({a.email})</li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t pt-4">
        <h2 className="text-lg font-medium mb-2">Register Attendee</h2>
        <RegisterAttendeeForm eventId={data.id} />
      </div>
    </div>
  );
}
