"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

const FormRespuesta = ({
    idcomentario,
    actualizarRespuestasCargadas
}: {
    idcomentario: number,
    actualizarRespuestasCargadas: (cargados: boolean) => void
}
) => {
    const { data: session } = useSession()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmint = handleSubmit(async (data, e) => {
        const res = await fetch('/api/respuestas', {
            method: 'POST',
            body: JSON.stringify(
                {
                    idcomentario: idcomentario,
                    idusuario: Number(session?.user.id),
                    contenido: data.contenido
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (res.ok) {
            actualizarRespuestasCargadas(false);
            e?.target.reset();
        } else {
            const resJSON = await res.json()
            alert('Error al crear la respuesta')
            console.log(resJSON)
        }
    })
    return (
        <form onSubmit={onSubmint}
            className='flex w-full'
        >
            <input
                title='Responder'
                placeholder={errors?.titulo ? 'Escriba una respuesta' : '...'}
                className='w-full rounded bg-gray-500 text-xs
                px-2 py-2'
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
                  text-xs
                  font-bold 
                  py-2 px-2
                  ml-2 mr-2
                  rounded
                  h-full'
                  
            >
                Responder
            </button>
        </form>
    )
}

export default FormRespuesta