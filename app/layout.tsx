import React from 'react'
import { Lato } from 'next/font/google'
import type { Metadata } from 'next'
import AuthContextProvider from '../context/AuthContextProvider'
import './global.scss'

// If loading a variable font, you don't need to specify the font weight
const lato = Lato({ weight: ['300', '400'], display: 'swap', subsets: ['latin'] })
export const metadata: Metadata = {
    title: 'Netflix',
    description: 'description for metadata',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={lato.className}>
            <body>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    )
};