import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

//Obtenemos los usuarios personal no registrados como usaurios normales
export async function GET() {
    const personal = await prisma.personal.findMany(
        {
            where: {
                usuario: null,
            }
        }
    )
    return NextResponse.json(personal);
}