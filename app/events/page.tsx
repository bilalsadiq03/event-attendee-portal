"use client"

import EventCard from "@/components/events/EventCard";
import { fetchEvents } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export default function EventsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  })

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p>Failed to load events</p>;
  if (data?.length === 0) {
    return <p className="text-muted-foreground">No events created yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((event: any) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
