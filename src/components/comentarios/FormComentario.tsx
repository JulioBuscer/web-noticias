"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
const FormComentario = ({
    idnota,
    actualizarComentariosCargados
}: {
    idnota: number, actualizarComentariosCargados: (cargados: boolean) => void
}) => {
    const { data: session } = useSession()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmint = handleSubmit(async (data, e) => {
        const res = await fetch('/api/comentarios', {
            method: 'POST',
            body: JSON.stringify(
                {
                    idnota: idnota,
                    idusuario: Number(session?.user.id),
                    contenido: data.contenido
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (res.ok) {
            actualizarComentariosCargados(false);
            e?.target.reset();
        } else {
            const resJSON = await res.json()
            alert('Error al crear el comentario')
            console.log(resJSON)
        }
    })

    return (
        <form onSubmit={onSubmint}
            className='flex w-full'
        >
            <input
                title='Comentar'
                placeholder={errors?.titulo ? 'Escriba un comentario' : '...'}
                className='w-full rounded bg-gray-500
                px-2 '
                {...register("contenido", { required: true })}
            />
            <button
                title='Enviar comentario'
                type="submit"
                className='
            w-24
            bg-blue-500
             hover:bg-blue-700
              text-white 
              font-bold 
              text-sm
              py-2 px-2
              ml-2 mr-2
              rounded
              h-full'
            >
                Comentar
            </button>
        </form>
    )
}

export default FormComentario