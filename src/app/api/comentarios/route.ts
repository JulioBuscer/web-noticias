import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    const { contenido, idusuario, idnota } = body;
    const comentario = await prisma.comentario.create({
        data: {
            contenido,
            idusuario,
            idnota,
        },
    });
    return NextResponse.json(comentario);
}