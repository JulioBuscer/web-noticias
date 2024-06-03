"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'

interface Proprs {
    children: React.ReactNode
}

const SessionAuthProvider = ({ children }: Proprs) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default SessionAuthProvider