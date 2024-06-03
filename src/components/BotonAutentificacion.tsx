"use client"
import { signIn, signOut, useSession } from 'next-auth/react'

const BotonAutentificacion = () => {
  const { data: session, status } = useSession()
  console.log(session, status)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <>
        Session iniciada como {session.user?.name} <br />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => signOut({
            callbackUrl: '/auth/login'
          })} >Cerrar sesión</button>
      </>
    )
  }
  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => signIn()} >Iniciar sesión</button>
    </div>
  )
}

export default BotonAutentificacion