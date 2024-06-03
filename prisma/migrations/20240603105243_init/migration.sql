-- CreateTable
CREATE TABLE "personal" (
    "idpersonal" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apepaterno" TEXT NOT NULL,
    "apematerno" TEXT,
    "direccion" TEXT,
    "fechadeingreso" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "usuario" (
    "idusuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apodo" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "fecharegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isadmin" BOOLEAN NOT NULL DEFAULT false,
    "idpersonal" INTEGER,
    CONSTRAINT "usuario_idpersonal_fkey" FOREIGN KEY ("idpersonal") REFERENCES "personal" ("idpersonal") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "nota" (
    "idnota" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecharegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idusuario" INTEGER NOT NULL,
    CONSTRAINT "nota_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario" ("idusuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comentario" (
    "idcomentario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contenido" TEXT NOT NULL,
    "fecharegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idusuario" INTEGER NOT NULL,
    "idnota" INTEGER NOT NULL,
    CONSTRAINT "comentario_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario" ("idusuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comentario_idnota_fkey" FOREIGN KEY ("idnota") REFERENCES "nota" ("idnota") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "respuesta" (
    "idrespuesta" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contenido" TEXT NOT NULL,
    "fecharegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idusuario" INTEGER NOT NULL,
    "idcomentario" INTEGER NOT NULL,
    CONSTRAINT "respuesta_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario" ("idusuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "respuesta_idcomentario_fkey" FOREIGN KEY ("idcomentario") REFERENCES "comentario" ("idcomentario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_apodo_key" ON "usuario"("apodo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_idpersonal_key" ON "usuario"("idpersonal");
