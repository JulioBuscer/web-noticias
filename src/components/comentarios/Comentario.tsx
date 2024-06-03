import React, { useEffect, useState } from 'react'
import Respuesta from '../respuestas/Respuesta';
import FormRespuesta from '../respuestas/FormRespuesta';
const Comentario = ({ idComentario: idComentario, usuario, contenido, fecharegistro }: { idComentario: number, usuario: string, contenido: string, fecharegistro: string }) => {


    const getRespuestas = async (idComentario: number) => {

        const urlRespuestas = `/api/respuestas/${idComentario}`
        const res = await fetch(urlRespuestas,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then((res) => res.json());
        return res
    }

    const [respuestas, setRespuestas] = useState([])
    const [respuestasCargadas, setRespuestasCargadas] = useState(false);

    useEffect(() => {
        if (!respuestasCargadas) {
            fetchRespuestas();
        }
    });

    const fetchRespuestas = async () => {
        try {
            const respuestas = await getRespuestas(idComentario);
            setRespuestas(respuestas);
            setRespuestasCargadas(true);
        } catch (error) {
            console.error('Error fetching responses:', error);
        }
    };
    const formatoFechaCorta = (fecha: string): string => {
        const fechaOriginal = new Date(fecha);

        const mes = fechaOriginal.getMonth() + 1;
        const dia = fechaOriginal.getDate();
        const anio = fechaOriginal.getFullYear();
        const hora = fechaOriginal.getHours();
        const minutos = fechaOriginal.getMinutes();

        return `${dia}/${mes}/${anio} - ${hora}:${minutos}hrs.`;
    };

    const actualizarRespuestasCargadas = (cargadas: boolean) => {
        setRespuestasCargadas(cargadas);
    };
    return (
        <div key={`comentario${idComentario}`}
            className='p-2'>
            <div className='flex w-full'>
                <div className='p-2  
                rounded-xl 
                bg-gray-600 w-fit'>
                    <p className='text-sm font-bold  text-blue-300'>
                        {usuario}
                    </p>
                    <p className=' text-base text-justify'>
                        {contenido}
                    </p>
                </div>
                <span className='text-xs font-extralight content-center'>
                    {fecharegistro}
                </span>
            </div>
            <span>
                <p className='text-xs font-extralight content-center'>Respuestas ({respuestas.length})</p>

                {respuestas.map((respuesta: any) => (
                    <Respuesta
                        key={respuesta.id}
                        idRespuesta={respuesta.idrespuesta}
                        respuesta={respuesta.contenido}
                        usuario={respuesta.usuario.apodo}
                        fechaRegistro={formatoFechaCorta(respuesta.fecharegistro)}
                    />
                ))}

                <FormRespuesta
                    idcomentario={idComentario}
                    actualizarRespuestasCargadas={actualizarRespuestasCargadas} />
            </span>
        </div>
    )
}

export default Comentario