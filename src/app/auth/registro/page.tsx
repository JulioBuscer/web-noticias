"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import CampoRequerido from '@/components/CampoRequerido'
import { useRouter } from 'next/navigation'
function Registro() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {

    if (data.contrasenia !== data.contrasenia2) {
      console.log("Las contraseñas no coinciden", data.contrasenia, data.contrasenia2)
      return alert("Las contraseñas no coinciden")
    }


    const res = await fetch('/api/auth/registro',
      {
        method: 'POST',
        body: JSON.stringify({
          apodo: data.nombre_usuario,
          correo: data.correo,
          contrasenia: data.contrasenia
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )

    if (res.ok) {
      alert('Registro exitoso')
      router.push('/auth/login')
    } else {
      const resJSON = await res.json()
      return alert((`Error al registrar usaurio : ${resJSON.message}`))
    }
  })

  return (
    <div>

      <h2 className='text-2xl text-center'>Registro</h2>

      <form action="" onSubmit={onSubmit}>
        <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
        {errors?.nombre_usuario && <CampoRequerido />}
        <input type="text" id="nombre_usuario"
          placeholder="Nombre de Usuario"
          className='w-full rounded block p-2 mb-4 text-black'
          {...register('nombre_usuario', { required: true })} />

        <label htmlFor="correo">Correo:</label>
        {errors?.correo && <CampoRequerido />}
        <input type="email" id="correo"
          placeholder="ejemplo@ejemplo.com"
          className='w-full rounded block p-2 mb-4 text-black'
          {...register('correo', { required: true })} />

        <label htmlFor="contrasenia">Contraseña:</label>
        {errors?.contrasenia && <CampoRequerido />}
        <input type="password" id="contrasenia"
          placeholder="Contraseña"
          className='w-full rounded block p-2 mb-4 text-black'
          {...register('contrasenia', { required: true })} />

        <label htmlFor="contrasenia2">Confirmar Contraseña:</label>
        {errors?.contrasenia2 && <CampoRequerido />}
        <input type="password" id="contrasenia2"
          placeholder="Repetir Contraseña"
          className='w-full rounded block p-2 mb-4 text-black'
          {...register('contrasenia2', { required: true })} />

        <button type="submit"
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Registrar
        </button>

      </form>

    </div>
  )
}

export default Registro