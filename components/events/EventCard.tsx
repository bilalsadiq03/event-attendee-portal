import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="hover:shadow-md transition cursor-pointer">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {new Date(event.date).toDateString()}
          </p>
          <p className="text-sm">{event.description}</p>
          <p className="text-sm font-medium">
            Capacity: {event.capacity}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
