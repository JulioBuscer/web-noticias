import React from 'react'

const Respuesta = ({ idRespuesta, respuesta, usuario, fechaRegistro }: { idRespuesta: number, respuesta: string, usuario: string, fechaRegistro: string }) => {
    return (
        <div key={`respuesta${idRespuesta}`}
            className='p-[0.5rem] w-full flex text-xs font-extralight'>
            <p className='w-full text-justify'>
                <span className='font-bold text-blue-300'>
                    {usuario}
                </span> :
                <span className='font-normal'>
                    {respuesta}
                </span> 
                <span className='text-[0.55rem] ml-[0.5rem]'>
                  {fechaRegistro}
                </span>
            </p>
            <hr />
        </div>
    )
}

export default Respuesta