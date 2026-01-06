import EventCard from "@/components/events/EventCard";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-store",
  });
  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

  if (events.length === 0) {
    return <p className="text-muted-foreground">No events created yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((event: any) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
