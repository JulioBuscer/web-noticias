"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import CampoRequerido from '@/components/CampoRequerido'

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {


    const res = await signIn('credentials', {
      correo: data.correo,
      contrasenia: data.contrasenia,
      redirect: false
    })

    console.log(res)

    if (res?.ok) {
      router.push('/noticias')
    } else {
      alert("Credenciales incorrectas")
    }

  })
  return (<div>

    <h2 className='text-2xl text-center'>Inicio de Sesión</h2>

    <form onSubmit={onSubmit}>

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

      <button type="submit"
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Iniciar Sesión
      </button>
    </form>

  </div>
  )
}

export default Login
