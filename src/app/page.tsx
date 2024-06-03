"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import Nota from '@/components/notas/Nota';
import NotaCargando from '@/components/notas/NotaCargando';


interface Filtro {
  usuario?: string;
  titulo?: string;
  desde?: Date;
  hasta?: Date;
}
function HomePage() {
  const { data: session, status } = useSession();

  const getNoticias = async () => {
    //Metodos de obtencion de datos
    const res = await fetch('/api/noticias',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then((res) => res.json());
    return res
  }

  const [noticias, setNoticias] = useState([])
  const [noticiasCargadas, setNoticiasCargadas] = useState(false)
  const [noticiasFiltradas, setNoticiasFiltradas] = useState([])
  const [filtro, setFiltro] = useState<Filtro>({});

  //Cargar las noticias al iniciar
  useEffect(() => {
    if (!noticiasCargadas) {
      fetchNoticias();
    }
  });

  const fetchNoticias = async () => {
    try {
      const noticias = await getNoticias();
      setNoticias(noticias);
      setNoticiasFiltradas(noticias);
      setNoticiasCargadas(true);
    } catch (error) {
      console.error('Error fetching Noticias:', error);
    }
  };
  const aplicarFiltro = () => {
    const noticiasFiltradas = filtrarNoticias(noticias, filtro);
    setNoticiasFiltradas(noticiasFiltradas);
  };

  const filtrarNoticias = (noticias: never[], filtro: Filtro) => {
    return noticias.filter((noticia: any) => {
      if (filtro.titulo && filtro.titulo.length > 5 && !noticia.titulo.toLowerCase().includes(filtro.titulo.toLowerCase())) {
        return false;
      }
      if (filtro.usuario && noticia.usuario !== filtro.usuario) {
        return false;
      }
      /*
      if (filtro.desde && noticia.fecha_registro < filtro.desde) {
        return false;
      }
      if (filtro.hasta && noticia.fecha_registro > filtro.hasta) {
        return false;
      }
      */
      return true;
    });
  };

  const resetFiltrosNoticias = () => {
    //setNoticiasFiltradas(noticias);
    fetchNoticias();
    setFiltro({});
  };

  if (status === 'loading') {
    return (
      <div role="status"
        className="grid w-full justify-center text-center 
        divide-y divide-gray-200 animate-pulse">

        {Array.from({ length: 10 }, (_, i) => (
          <NotaCargando
            key={i}
            idnota={0} />
        ))
        }

        <span className="sr-only">Loading...</span>
      </div>
    )
  } else {
    return (
      <div className='w-full h-full flex '>

        <section className='w-full px-5 py-5 justify-center'>
          <section className='w-full pt-5 text-center'>
            <h1 className='w-full 
          text-3xl font-bold pb-10'>ULTIMAS NOTICIAS</h1>
            <div
              className="grid w-full justify-center text-center 
            divide-y divide-gray-200">
              {noticiasFiltradas.map((noticia: any) => (
                <Nota
                  key={noticia.idnota}
                  idnota={noticia.idnota}
                  titulo={noticia.titulo}
                  contenido={noticia.contenido}
                  fecha_registro={noticia.fecharegistro}
                  usuario={noticia.usuario.apodo} ></Nota>
              ))}
            </div>
          </section>
        </section>
        <section className='w-1/3 px-5 py-5'>
          <section className='w-full pt-5 '>
            <h1 className='w-full 
          text-2xl font-bold pb-10'>
              Filtrar Noticias
            </h1>
            <div className='w-full'>

              <label htmlFor="usuario" className='w-full text-left'>Usuario</label>
              <input type="text"
                placeholder="Usuario"
                value={filtro.usuario || ''}
                className='w-full mb-4 bg-gray-500'
                onChange={e => setFiltro({ ...filtro, usuario: e.target.value })} />

              <label htmlFor="titulo" className='w-full text-left'>Título</label>
              <input type="text"
                placeholder="Título"
                value={filtro.titulo || ''}
                className='w-full mb-4 bg-gray-500'
                onChange={e => setFiltro({ ...filtro, titulo: e.target.value })} />
              {false ? (
                <div>
                  <label htmlFor="desde" className='w-full text-left'>Desde</label>
                  <input type="date"
                    placeholder="Desde"
                    value={filtro.desde?.toISOString().split('T')[0]}
                    className='w-full mb-4 bg-gray-500 '
                    onChange={e => setFiltro({ ...filtro, desde: new Date(e.target.value) })} />

                  <label htmlFor="hasta" className='w-full text-left'>Hasta</label>
                  <input type="date"
                    placeholder="Hasta"
                    value={filtro.hasta?.toISOString().split('T')[0]}
                    className='w-full mb-4 bg-gray-500'
                    onChange={e => setFiltro({ ...filtro, hasta: new Date(e.target.value) })} />
                </div>
              ) : null
              }
              <div className='w-full flex justify-between'>

                <button type='button'
                  onClick={aplicarFiltro}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Filtrar
                </button>
                <button type='button'
                  onClick={resetFiltrosNoticias}
                  className='bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded'>
                  Limpiar filtros
                </button>
              </div>

            </div>
          </section>
        </section>
      </div>
    )
  }
}
export default HomePage