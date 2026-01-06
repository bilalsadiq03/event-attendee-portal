import RegisterAttendeeForm from "@/components/forms/RegisterAttendeeForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getEvent(id: string) {
  const res = await fetch(`http://localhost:3000/api/events/${id}`, {
    cache: "no-store",
  });
  
  return res.json();
}

export default async function EventDetailsPage({params}: PageProps) {
    const { id } = await params;
    const event = await getEvent(id);
    

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{event.title}</h1>
      <p>{event.description}</p>
      <p className="text-sm text-muted-foreground">
        {new Date(event.date).toDateString()}
      </p>

      <div className="border-t pt-4">
        <h2 className="text-lg font-medium mb-2">Attendees</h2>
        {event.attendees?.length === 0 ? (
          <p className="text-muted-foreground">No attendees yet.</p>
        ) : (
          <ul className="list-disc pl-4">
            {event.attendees?.map((a: any) => (
              <li key={a.id}>{a.name} ({a.email})</li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t pt-4">
        <h2 className="text-lg font-medium mb-2">Register Attendee</h2>
        <RegisterAttendeeForm eventId={event.id} />
      </div>
    </div>
  );
}
