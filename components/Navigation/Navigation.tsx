'use client';
import React from 'react'
import Link from 'next/link'
import { IoMdHome } from "react-icons/io";
import { useSession } from 'next-auth/react';
import SignOutButton from '../SignOutButton/SignOutButton'
import Container from '../Container/Container'
import { useSaveOAuthUserOnDB } from '../../lib/useSaveOAuthUser';
import './navigation.scss'

function Navigation() {
    const session = useSession()
    // call this hook for save Google users on MongoDB (not credentials users)
    useSaveOAuthUserOnDB('google');
    // console.log('TIME ---> ', new Date(1721740942080).toLocaleTimeString())

    return (
        <nav className='navbar'>
            <Container width={1200}>
                <div className='nav-wrapper'>
                    <div className='left-side'>
                        <Link href='/'>
                            <IoMdHome color='green' size={20}/>
                        </Link>
                        <h3 style={{color: 'blue'}}>{ session.status }</h3>
                    </div>
                    <div className='right-side'>
                        {/* if the User is not authorized */}
                        { !session.data && <Link href='/register' className='signin-button'>Sign up</Link>}
                        { !session.data && <Link href='/login' className='signin-button'>Login in</Link>}
                        {/* if the User is authorized */}
                        { session.data && <Link href='/account' className='signin-button'>Account</Link>}
                        { session.data &&  <SignOutButton/>}
                    </div>
                </div>
            </Container>
        </nav>
    )
}

export default Navigation;