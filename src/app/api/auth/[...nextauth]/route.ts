import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import { JWT } from "next-auth/jwt";
import { pages } from "next/dist/build/templates/app-page";

export const authOptions = {
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                correo: {
                    label: "Correo",
                    type: "text",
                    placeholder: "ejemplo@ejemplo.com"
                },
                contrasenia: {
                    label: "Contraseña",
                    type: "password",
                    placeholder: "********"
                },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    console.log("credentials", credentials)
                    return null;
                }
                const usuarioEncontrado = await prisma.usuario.findUnique({
                    where: {
                        correo: credentials.correo,
                        contrasenia: credentials.contrasenia
                    }
                });

                if (!usuarioEncontrado) {
                    console.log("No existe el usuario")
                    return null;
                }
                const user = {
                    id: usuarioEncontrado.idusuario.toString(),
                    name: usuarioEncontrado.apodo,
                    email: usuarioEncontrado.correo,
                    role: usuarioEncontrado.idpersonal === null ? "externo" : "interno",
                    isadmin: usuarioEncontrado.isadmin
                }
                console.log(user)
                return user
            }
        })

    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: any }) {
            return { ...token, ...user };
        },
        async session({ session, token }: { session: any, token: JWT }) {
            session.user = token as any;
            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
        error: "/",
        signOut: "/auth/login",
    }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }