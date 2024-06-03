import { NextResponse } from "next/server";
import prisma from '@/libs/prisma'

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const respuestas = await prisma.respuesta.findMany({
        where: {
            idcomentario: Number(params.id)
        }
        , include: {
            usuario: {
                select: { apodo: true }
            }
        }
    })
    return NextResponse.json(respuestas);
}

