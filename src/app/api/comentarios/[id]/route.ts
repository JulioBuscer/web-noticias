import { NextResponse } from "next/server";
import prisma from '@/libs/prisma'

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const comentarios = await prisma.comentario.findMany({
        where: {
            idnota: Number(params.id)
        }
        , include: {
            usuario: {
                select: { apodo: true }
            }
        }
    })
    return NextResponse.json(comentarios);
}