'use client';
import React, { useEffect } from 'react'
import Link from 'next/link'
import { IoMdHome } from "react-icons/io";
import { useSession } from 'next-auth/react';
import SignOutButton from '../SignOutButton/SignOutButton'
import Container from '../Container/Container'
import { useRouter } from 'next/navigation';


import './navigation.scss'

function Navigation() {
    const session = useSession()
    const { data, status } = useSession()
    const router = useRouter()

    console.log('SESSION ---->', session.data?.user)

    const  signinAndSaveUserOnMongoDB = async () => {
        try {
            if(data && status === 'authenticated') {
                const response = await fetch('api/auth/register', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        name: data?.user?.name,
                        email: data?.user?.email,
                        password: 'password',
                        image: data?.user?.image,
                        provider: 'google'
                    })
                })
                if(response.ok) {
                    router.push('/')
                }
                if(!response.ok) { throw new Error('Response not OK') }
    
            }
        } 
        catch (error) { throw new Error('ERROR in Sign In form') }
    }


    useEffect(() => {
        status === 'authenticated' && signinAndSaveUserOnMongoDB()
    }, [status])


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