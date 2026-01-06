import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const events = await prisma.event.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(events);
    } catch (error){
        return NextResponse.json(
            { error : "Failed to fetch events"},
            { status: 500}
        );
    }
}


export async function POST(req: Request){
    try{
        const body = await req.json();
        const {title, description, date, capacity} = body;

        if (!title || !date || !capacity){
            return NextResponse.json(
                { error: "Missing Required Fields"},
                { status: 400}
            );
        }

        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                capacity,
            }
        });
        
        return NextResponse.json(event, {status: 201});
    } catch (error){
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}