"use client"
import Router from 'next/router'
import { useRouter } from 'next/navigation'

function Noticias() {
  const Router = useRouter()
  Router.push('/')

  const getNoticias = async () => {

    const res = await fetch('/api/noticias',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    const data = await res.json();
    console.log(data);
  }


  return (
    <div>
      Noticias

      <button
        onClick={getNoticias}
        className="btn btn-primary"
      >
        Get Noticias
      </button>
    </div>
  )
}

export default Noticias