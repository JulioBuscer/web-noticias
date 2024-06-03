"use client"
import CampoRequerido from '@/components/CampoRequerido'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function NuevaNoticia() {
  const router = useRouter()
  const { data: session } = useSession()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmint = handleSubmit(async (data, e) => {
    const res = await fetch('/api/noticias', {
      method: 'POST',
      body: JSON.stringify(
        {
          titulo: data.titulo,
          contenido: data.contenido,
          idusuario: Number(session?.user.id)
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (res.ok) {
      alert('Noticia creada')
      router.push('/')
    } else {
      const resJSON = await res.json()
      alert('Error al crear la noticia')
      console.log(resJSON)
    }
  }
  )
  return (
    <div>
      <h2 className='text-2xl text-center'>Crear Nueva Noticia</h2>

      <form className='p-10'
        onSubmit={onSubmint}>
        <label htmlFor="titulo">Título:</label>
        {errors?.titulo && <CampoRequerido />}
        <input type="text"
          id="titulo"
          placeholder='Título de la nota'
          className='w-full p-2 mb-4 rounded text-black'
          {...register("titulo", { required: true })}
        />

        <label htmlFor="contenido">Contenido:</label>
        {errors?.contenido && <CampoRequerido />}
        <textarea id="contenido"
          placeholder='Contenido de la nota'
          className='w-full p-2 mb-4 rounded text-black'
          {...register("contenido", { required: true })} />

        <button type="submit"
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Crear
        </button>
      </form>
    </div>
  )
}

export default NuevaNoticia