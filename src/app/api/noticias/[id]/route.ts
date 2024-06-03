import { NextResponse } from "next/server";
import prisma from '@/libs/prisma'

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const noticia = await prisma.nota.findUnique({
        where: {
            idnota: Number(params.id)
        }
    })
    return NextResponse.json(noticia);
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const datos = await request.json();
    const noticiaEditada = await prisma.nota.update({
        where: {
            idnota: Number(params.id)
        },
        data: datos
    })
    return NextResponse.json(noticiaEditada);
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const noticiaEliminada = await prisma.nota.delete({
        where: {
            idnota: Number(params.id)
        }
    })
    return NextResponse.json(noticiaEliminada);
}