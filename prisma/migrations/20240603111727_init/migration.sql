-- CreateTable
CREATE TABLE "personal" (
    "idpersonal" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apepaterno" TEXT NOT NULL,
    "apematerno" TEXT,
    "direccion" TEXT,
    "fechadeingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personal_pkey" PRIMARY KEY ("idpersonal")
);

-- CreateTable
CREATE TABLE "usuario" (
    "idusuario" SERIAL NOT NULL,
    "apodo" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "fecharegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isadmin" BOOLEAN NOT NULL DEFAULT false,
    "idpersonal" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("idusuario")
);

-- CreateTable
CREATE TABLE "nota" (
    "idnota" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecharegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idusuario" INTEGER NOT NULL,

    CONSTRAINT "nota_pkey" PRIMARY KEY ("idnota")
);

-- CreateTable
CREATE TABLE "comentario" (
    "idcomentario" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecharegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idusuario" INTEGER NOT NULL,
    "idnota" INTEGER NOT NULL,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("idcomentario")
);

-- CreateTable
CREATE TABLE "respuesta" (
    "idrespuesta" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecharegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idusuario" INTEGER NOT NULL,
    "idcomentario" INTEGER NOT NULL,

    CONSTRAINT "respuesta_pkey" PRIMARY KEY ("idrespuesta")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_apodo_key" ON "usuario"("apodo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_idpersonal_key" ON "usuario"("idpersonal");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_idpersonal_fkey" FOREIGN KEY ("idpersonal") REFERENCES "personal"("idpersonal") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nota" ADD CONSTRAINT "nota_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("idusuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("idusuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_idnota_fkey" FOREIGN KEY ("idnota") REFERENCES "nota"("idnota") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuesta" ADD CONSTRAINT "respuesta_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("idusuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuesta" ADD CONSTRAINT "respuesta_idcomentario_fkey" FOREIGN KEY ("idcomentario") REFERENCES "comentario"("idcomentario") ON DELETE RESTRICT ON UPDATE CASCADE;
