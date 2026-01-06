import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try{
        const body = await req.json();
        const {name, email, eventId} = body;

        if (!name || !email ||!eventId){
            return NextResponse.json(
                { error: "Missing required fields"},
                { status: 400}
            );
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: { attendees : true},
        });

        if (!event){
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 },
            );
        }

        if (event.attendees.length >= event.capacity){
            return NextResponse.json(
                { error: "Event capacity reached" },
                { status: 404 }
            );
        }

        const attendee = await prisma.attendee.create({
            data: {
                name,
                email,
                eventId
            },
        });

        return NextResponse.json(attendee, { status: 201 });
    } catch (error: any) {
        if (error.code === "P2002"){
            return NextResponse.json(
                { error: "Attendee already registered" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Failed to register attendee"},
            { status: 500 }
        );
    }
}