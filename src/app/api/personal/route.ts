import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

//Obtenemos las noticias 
export async function GET() {
    const personal = await prisma.personal.findMany()
    return NextResponse.json(personal);
}