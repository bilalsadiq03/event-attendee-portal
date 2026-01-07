export const fetchEvents = async () => {
    const res = await fetch ('/api/events');
    if (!res.ok) throw new Error("Failed to fetch events")
    return  res.json()
};

export const fetchEventById = async (id: string) => {
    const res = await fetch(`/api/events/${id}`);
    if (!res.ok) throw new Error("Failed to fetch event")
    return  res.json()
}

export const createEvent = async (data: any) => {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
};

export const registerAttendee = async (data: any) => {
  const res = await fetch("/api/attendees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to register attendee");
  return res.json();
};

