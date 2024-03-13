import React from 'react'
import { Roboto } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({ weight: '300', display: 'swap', subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={roboto.className}>
            <body>{children}</body>
        </html>
    )
};