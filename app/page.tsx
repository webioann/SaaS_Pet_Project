import Link from 'next/link'
import React from 'react'
import SignOutButton from '../components/AuthComponents/SignOutButton'
import Container from '../components/Container/Container'

function HomePage() {
    return (
        <Container width={1200}>
            <h1>Home</h1>
            <Link href='/signup'>Create new account</Link>
            <Link href='/login'>Login in your account</Link>
            <SignOutButton/>
        </Container>
    )
}

export default HomePage