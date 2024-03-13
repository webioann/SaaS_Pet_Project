import React from 'react'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'
import './global.scss'

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({ weight: '300', display: 'swap', subsets: ['latin'] })
export const metadata: Metadata = {
    title: 'next js',
    description: 'description for metadata',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={roboto.className}>
            <body>
                {children}
            </body>
        </html>
    )
};