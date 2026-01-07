"use client"

import EventCard from "@/components/events/EventCard";
import { fetchEvents } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { EventsSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyEventsState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";


export default function EventsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  })

  if (isLoading) return <EventsSkeleton />;
  if (isError) return <ErrorState message="Failed to load events"/>;
  if (data?.length === 0) {
    return <EmptyEventsState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((event: any) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
