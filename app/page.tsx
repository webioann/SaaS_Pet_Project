import Link from 'next/link'
import React from 'react'

function HomePage() {
    return (
        <div>
            <h1>Home</h1>
            <Link href='/signup'>Create new account</Link>
            <Link href='/login'>Login in your account</Link>
        </div>
    )
}

export default HomePage