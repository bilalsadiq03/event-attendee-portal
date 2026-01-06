import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: { attendees: true },
  });

  if (!event) {
    return NextResponse.json(
      { error: "Event not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}