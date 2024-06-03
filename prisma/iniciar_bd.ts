const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    //Crear 3 personal
    const personal = await prisma.personal.createMany({
        data: [
            {
                nombre: "Juan",
                apepaterno: "Perez",
                apematerno: "Gomez",
                direccion: "Calle 123"
            },
            {
                nombre: "Maria",
                apepaterno: "Gonzalez",
                apematerno: "Lopez",
                direccion: "Avenida 456"
            },
            {
                nombre: "Pedro",
                apepaterno: "Lopez",
                apematerno: "Perez",
                direccion: "Calle 789"
            }
        ]
    })
    console.log(personal)

    //Crear 2 usuarios uno con relación al personal y el otro sin relación al personal
    const usuarios = await prisma.usuario.createMany({
        data: [
            {
                apodo: "JuanPerez",
                correo: "juanito@example.com",
                contrasenia: "123456",
                isadmin: true,
                idpersonal: 1

            },
            {
                apodo: "Buscer",
                correo: "buscer@example.com",
                contrasenia: "123456"
            },
            {
                apodo: "MariaGonzales",
                correo: "maria@example.com",
                contrasenia: "123456",
                idpersonal: 2
            }
        ]
    })
    console.log(usuarios)

    //Crear 3 notas
    const notas = await prisma.nota.createMany({
        data: [
            { titulo: "Nota 1", contenido: "Contenido de la nota 1", idusuario: 1, fecharegistro: "2022-01-01T00:00:00.000Z" },
            { titulo: "Nota 2", contenido: "Contenido de la nota 2", idusuario: 1 },
            { titulo: "Nota 3", contenido: "Contenido de la nota 3", idusuario: 1 }
        ]
    })
    console.log(notas)

    //Crear 2 comentarios
    const comentarios = await prisma.comentario.createMany({
        data: [
            { contenido: "Comentario 1", idusuario: 2, idnota: 1 },
            { contenido: "Comentario 2", idusuario: 2, idnota: 1 },
            { contenido: "Comentario 3", idusuario: 2, idnota: 2 },
        ]
    })
    console.log(comentarios)

    //Crear 1 respuesta
    const respuesta = await prisma.respuesta.createMany({
        data: [
            { contenido: "Respuesta 1", idusuario: 1, idcomentario: 1 }
        ]
    })
    console.log(respuesta)

}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    }).finally(async () => {
        await prisma.$disconnect()
    })