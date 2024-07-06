'use client';
import React from 'react'
import Link from 'next/link'
import { IoMdHome } from "react-icons/io";

import { useSession } from 'next-auth/react';
import SignOutButton from '../AuthComponents/SignOutButton'
import Container from '../Container/Container'
import './navigation.scss'

function Navigation() {
    const session = useSession()

    return (
        <nav className='navbar'>
            <Container width={1200}>
                <div className='nav-wrapper'>
                    <div className='left-side'>
                        <Link href='/'>
                            <IoMdHome color='green' size={20}/>
                        </Link>
                        { !session.data && <Link href='/signup'>Sign up</Link>}
                        { !session.data && <Link href='/login'>Login in</Link>}
                        { session.data && <Link href='/account'>Account</Link>}

                    </div>
                    <SignOutButton/>

                </div>
            </Container>
        </nav>
    )
}

export default Navigation;