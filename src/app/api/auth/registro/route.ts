import { NextResponse } from "next/server";
import prisma from '@/libs/prisma'

export async function POST(request: Request) {
    const datos = await request.json();
    try {
        const usaurioEncontrado = await prisma.usuario.findUnique({
            where: {
                apodo: datos.apodo
            }
        });

        if (usaurioEncontrado) {
            return NextResponse.json({ message: 'El Usuario ya existe' }, { status: 400 });
        }

        const correoEncontrado = await prisma.usuario.findUnique({
            where: {
                correo: datos.correo
            }
        });

        if (correoEncontrado) {
            return NextResponse.json({ message: 'El correo ya esta registrado' }, { status: 400 });
        }

        const nuevoUsuario = await prisma.usuario.create({
            data: {
                apodo: datos.apodo,
                correo: datos.correo,
                contrasenia: datos.contrasenia,
                idpersonal: datos.idpersonal !== null ? Number(datos.idpersonal) : null
            }
        });

        const { contrasenia: _, ...usuarioRegistrado } = nuevoUsuario

        return NextResponse.json(usuarioRegistrado);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
