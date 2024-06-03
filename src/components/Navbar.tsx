"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
function Navbar() {

    const { data: session } = useSession();

    return (
        <nav className="flex justify-between items-center px-24 w-full">

            {session?.user ? (

                <p>Bienvenido {session?.user?.name}</p>
            ) : (<p></p>)}
            <Link href="/"
                className="text-3xl font-bold">
                Noticias
            </Link>
            {session?.user ? (
                <ul className="flex gap-2">
                    {session?.user.isadmin ?
                        <li className="hover:bg-gray-700 hover:text-white px-2 py-1 rounded">
                            <Link href="/RegistrarNuevoUsaurioInterno"
                                title="Registrar Nuevo Usaurio Interno">
                                Registrar Interno
                            </Link>
                        </li> : <></>}
                    {session?.user.role === "interno" ? (
                        <li className="hover:bg-gray-700 hover:text-white px-2 py-1 rounded">

                            <Link href="/noticias/nueva-noticia">Nueva Noticia</Link>
                        </li>
                    ) : (<></>)}
                    <li className="hover:bg-gray-700 hover:text-white px-2 py-1 rounded">
                        <Link href="/auth/login"
                            onClick={() => signOut({
                                callbackUrl: '/auth/login'
                            })}
                        >Cerra Sesion</Link>
                    </li>
                </ul>
            ) : (
                <ul className="flex gap-2">

                </ul>
            )}
        </nav>
    )

}

export default Navbar