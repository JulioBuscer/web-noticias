import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

//Obtenemos las noticias 
export async function GET() {
    const noticias = await prisma.nota.findMany(
        {
            orderBy: { fecharegistro: 'desc' },
            include: {
                usuario: {
                    select: { apodo: true }
                }
            }
        }
    )
    return NextResponse.json(noticias);
}
//Añadimos una nueva noticia a la BD
export async function POST(request: Request) {
    const body = await request.json();
    const { titulo, contenido, idusuario } = body;
    const noticia = await prisma.nota.create({
        data: {
            titulo,
            contenido,
            idusuario,
        },
    });
    return NextResponse.json(noticia);
}