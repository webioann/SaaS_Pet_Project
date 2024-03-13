import React from 'react'
import Link from 'next/link'

export default function Home() {
    return (
        <main>
            <nav>
                <Link href='/users'>Users link</Link>
            </nav>
            <h1>HELLO WORLD AND GIT</h1>
        </main>
    )
};

