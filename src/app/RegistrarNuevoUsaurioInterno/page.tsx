"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import CampoRequerido from '@/components/CampoRequerido'

function RegistrarNuevoUsaurioInterno() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { data: session, status } = useSession()
  const router = useRouter()

  if (session?.user.isadmin === false) {
    router.push('/')
  }

  const onSubmit = handleSubmit(async (data, e) => {

    if (data.contrasenia !== data.contrasenia2) {
      console.log("Las contraseñas no coinciden", data.contrasenia, data.contrasenia2)
      return alert("Las contraseñas no coinciden")
    }

    const res = await fetch('/api/auth/registro', {
      method: 'POST',
      body: JSON.stringify({
        apodo: data.nombre_usuario,
        correo: data.correo,
        contrasenia: data.contrasenia,
        idpersonal: data.idpersonal
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (res.ok) {
      alert('Registro exitoso')
      setPersonalCargados(false);
      e?.target.reset();
    } else {
      const resJSON = await res.json()
      console.log(resJSON)
      return alert((`Error al registrar usaurio`))
    }
  })

  const getPersonal = async () => {

    const res = await fetch('/api/personal/personal-no-registrado', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json());
    console.log(res)
    return res
  }

  const [personal, setPersonal] = useState([])
  const [personalCargados, setPersonalCargados] = useState(false);

  useEffect(() => {
    if (!personalCargados) {
      fetchPersonal()
    }
  })

  const fetchPersonal = async () => {
    try {
      const personal = await getPersonal();
      setPersonal(personal);
      setPersonalCargados(true);
    } catch (error) {
      console.error('Error fetching personal:', error);
    }
  }

  return (
    <div>

      <form onSubmit={onSubmit}>

        <label htmlFor="nombre_usuario">Nombre de usuario:</label>
        {errors?.nombre_usuario && <CampoRequerido />}
        <input
          type="text"
          id="nombre_usuario"
          placeholder='Nombre de usuario'
          className='w-full p-2 mb-4 rounded text-black'
          {...register("nombre_usuario", { required: true })}
        />

        <label htmlFor="correo">Correo:</label>
        {errors?.correo && <CampoRequerido />}
        <input
          type="email"
          id="correo"
          placeholder='Correo'
          className='w-full p-2 mb-4 rounded text-black'
          {...register("correo", { required: true })}
        />

        <label htmlFor="contrasenia">Contraseña:</label>
        {errors?.contrasenia && <CampoRequerido />}
        <input
          type="password"
          id="contrasenia"
          placeholder='Contraseña'
          className='w-full p-2 mb-4 rounded text-black'
          {...register("contrasenia", { required: true })}
        />

        <label htmlFor="contrasenia2">Repetir Contraseña:</label>
        {errors?.contrasenia2 && <CampoRequerido />}
        <input
          type="password"
          id="contrasenia2"
          placeholder='Repetir Contraseña'
          className='w-full p-2 mb-4 rounded text-black'
          {...register("contrasenia2", { required: true })}
        />
        <label htmlFor="idpersonal">Personal:</label>
        <select id='idpersonal'
          title='Personal'
          {...register("idpersonal", { required: true })}
          className='w-full p-2 mb-4 rounded text-black'>

          {personal.map((personal: any) => (
            <option key={personal.idpersonal} value={personal.idpersonal}>
              {personal.nombre} {personal.apepaterno} {personal.apematerno}
            </option>
          ))}
          {personal?.length === 0 && <option disabled value="">No hay personal para registrar</option>}

        </select>

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          type="submit"
        >

          Registrar
        </button>
      </form>
    </div>
  )
}

export default RegistrarNuevoUsaurioInterno