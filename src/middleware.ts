export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/'
        , '/noticias/:path*'
        , '/RegistrarNuevoUsaurioInterno/:path*'
    ],

    pages: {
        signIn: '/auth/login',

    }

}
