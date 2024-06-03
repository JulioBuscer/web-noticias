
import React, { useEffect, useState } from 'react'
import Comentario from '../comentarios/Comentario';
import FormComentario from '../comentarios/FormComentario';

const Nota = ({ idnota, titulo, contenido, usuario, fecha_registro }: { idnota: number, titulo: string, contenido: string, usuario: string, fecha_registro: string }) => {

    const getComentarios = async (idnota: number) => {
        const urlComentarios = `/api/comentarios/${idnota}`
        const res = await fetch(urlComentarios,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then((res) => res.json());
        return res
    }

    const [comentarios, setComentarios] = useState([])
    const [comentariosCargados, setComentariosCargados] = useState(false);


    useEffect(() => {
        if (!comentariosCargados) {
            fetchComentarios();
        }
    });

    const fetchComentarios = async () => {
        try {
            const respuestas = await getComentarios(idnota);
            setComentarios(respuestas);
            setComentariosCargados(true);
        } catch (error) {
            console.error('Error fetching responses:', error);
        }
    };

    const formatoFechaLarga = (fecha: string): string => {
        const fechaOriginal = new Date(fecha);

        const mes = fechaOriginal.toLocaleString('es-ES', { month: 'long' });
        const dia = fechaOriginal.getDate();
        const anio = fechaOriginal.getFullYear();
        const hora = fechaOriginal.getHours();
        const minutos = fechaOriginal.getMinutes();

        return `${dia} de ${mes}  del ${anio} a las ${hora}:${minutos} hrs.`;
    };

    const formatoFechaCorta = (fecha: string): string => {
        const fechaOriginal = new Date(fecha);

        const mes = fechaOriginal.getMonth() + 1;
        const dia = fechaOriginal.getDate();
        const anio = fechaOriginal.getFullYear();
        const hora = fechaOriginal.getHours();
        const minutos = fechaOriginal.getMinutes();

        return ` 🕘${hora}:${minutos}hrs. - ${dia}/${mes}/${anio}`;
    };
    const actualizarComentariosCargados = (cargados: boolean) => {
        setComentariosCargados(cargados);
    };
    return (


        <div key={`nota${idnota}`}
            className="
                text-center px-4  py-4 pt-4
                justify-center
                min-w-[50dvw]
                bg-gray-700
                rounded-xl
                mb-4 ">
            <div className='w-full text-left justify-center content-center'>
                <h2 className="text-2xl font-bold">{titulo}
                </h2>
            </div>

            <div className=" 
                p-2">
                <p className="text-center content-center min-h-32 bg-gray-600 mb-1">
                    {contenido}
                </p>
                <p
                    className='text-xs text-right font-extralight'
                > publicado por
                    <span className='font-light text-blue-300'>
                        {usuario}
                    </span> - {formatoFechaLarga(fecha_registro)}
                </p>
                <hr />

            </div>

            <div className='w-full justify-center content-center text-left'>
                <label className='text-xl font-bold'>
                    Comentarios <span className='text-sm font-extralight'>({comentarios.length})</span>
                </label>


                {comentarios.map((comentario: any) => (

                    <Comentario
                        key={comentario.idcomentario}
                        idComentario={comentario.idcomentario}
                        usuario={comentario.usuario.apodo}
                        contenido={comentario.contenido}
                        fecharegistro={formatoFechaCorta(comentario.fecharegistro)}

                    />
                ))}
                {comentarios && <hr className='w-full mb-4' />}

                <FormComentario
                    idnota={idnota}
                    actualizarComentariosCargados={actualizarComentariosCargados}
                />
            </div>
        </div>
    )
}


export default Nota