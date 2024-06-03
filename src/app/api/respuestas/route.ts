import { NextResponse } from "next/server";
import prisma from '@/libs/prisma'

export async function POST(request: Request) {
    const body = await request.json();
    const { contenido, idusuario, idcomentario } = body;
    const comentario = await prisma.respuesta.create({
        data: {
            contenido,
            idusuario,
            idcomentario,
        },
    });
    return NextResponse.json(comentario);
}