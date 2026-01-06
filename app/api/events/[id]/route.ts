import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(req: Request, {params} : { params: { id: String}}){
    try {
        const event = await prisma.event.findUnique({
            where: { id: params.id },
            include: { attendees: true }
        });

        if (!event){
            return NextResponse.json(
                {error: "Event not Found!"},
                {status: 404}
            );
        }

        return NextResponse.json(event);
    } catch (error){
        return NextResponse.json(
            { error: "failed to fetch event"},
            {status: 500}
        );
    }
}