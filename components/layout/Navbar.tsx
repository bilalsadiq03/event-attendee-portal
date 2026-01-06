import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/events" className="text-xl font-semibold">
          Event Portal
        </Link>

        <Link href="/events/new">
          <Button>Create Event</Button>
        </Link>
      </div>
    </nav>
  );
}
