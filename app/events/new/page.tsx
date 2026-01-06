import CreateEventForm from "@/components/forms/CreateEventForm";

export default function NewEventPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Create New Event</h1>
      <p className="text-muted-foreground">
        <CreateEventForm />
      </p>
    </div>
  );
}
