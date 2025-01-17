import { db } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";



import { PrismaClient } from '@prisma/client'


// GET /api/client
const prisma = new PrismaClient()
export default async function read() {
    const allUsers = await prisma.client.findMany({
        where: {
            email: "soman@hail.com"
        }
    });
    console.log(allUsers);
}

export async function POST(request: NextRequest) {
    try {
        // Parse the incoming JSON data
        const formDatax = await request.json();
        const formData = formDatax.newdata;
        console.log("Received data:", formData);

        // Upsert the client into the database
        await db.client.upsert({
            where: {
                email: formData.email,
                location: formData.location,
                name: formData.name,
                expectedentry: formData.expectedentry,
            },
            create: {
                email: formData.email,
                location: formData.location,
                name: formData.name,
                expectedentry: formData.expectedentry,
                
            },
            update: {
               
            },
        });

       
        return NextResponse.json({ message: "Client created" }, { status: 200 });
        

    } catch (error) {
        console.error("Error creating client:", error);
        return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
    }
}
