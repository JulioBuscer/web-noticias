
import React, { useEffect, useState } from 'react'
const NotaCargando = ({idnota}: {idnota: number}) => {

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
                <h2 className="text-2xl font-bold"> 
                    Cargando...
                </h2>
            </div>

            <div className=" 
                p-2">
                <p className="text-center content-center min-h-32 bg-gray-600 mb-1">
                    <span className='font-bold text-blue-300'>Cargando...</span>
                </p>
                <p
                    className='text-xs text-right font-extralight'
                > publicado por
                    <span className='font-light text-blue-300'>
                        Cargando...
                    </span> - Cargando...
                </p>
                <hr />

            </div>

            <div className='w-full justify-center content-center text-left'>
                <label className='text-xl font-bold'>
                    <span className='text-sm font-extralight'></span>
                </label>
            </div>
        </div>
    )
}


export default NotaCargando