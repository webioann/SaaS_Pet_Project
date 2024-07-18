'use client';
import React, { useEffect } from 'react'
import Link from 'next/link'
import { IoMdHome } from "react-icons/io";
import { useSession } from 'next-auth/react';
import SignOutButton from '../SignOutButton/SignOutButton'
import { signOut } from "next-auth/react"

import Container from '../Container/Container'
import { useSaveUserOnDB } from '../../lib/useSaveUserOnDB'
// import { useWhenAppWillClosed } from '../../lib/useWhenAppWillClosed'
import './navigation.scss'

function Navigation() {
    const session = useSession()
    console.log('SESSION ---->', session)
    // useSaveUserOnDB();
// useEffect(() => {
//     // remove all current sessios before start app
//     signOut();
// }, [])

    // useEffect(() => {
    //     window.addEventListener('beforeunload', alertUser)
    //     window.addEventListener('unload', handleTabClosing)
    //     return () => {
    //         window.removeEventListener('beforeunload', alertUser)
    //         window.removeEventListener('unload', handleTabClosing)
    //     }
    // })
    
    // const handleTabClosing = () => {
    //     signOut()
    //     console.log('handleTabClosing function call')
    // }
    
    // const alertUser = async (event: BeforeUnloadEvent) => {
    //     event.preventDefault()
    //     await signOut()
    //     event.returnValue = ''
    //     console.log('alertUser function call')
    // }

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