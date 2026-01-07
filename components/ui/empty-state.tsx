import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyEventsState() {
  return (
    <div className="text-center py-12 space-y-3">
      <p className="text-lg font-medium">No events created yet</p>
      <p className="text-muted-foreground">
        Create your first event to get started.
      </p>
      <Link href="/events/new">
        <Button>Create Event</Button>
      </Link>
    </div>
  );
}
