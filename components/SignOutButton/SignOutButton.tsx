"use client";  
import React from 'react'
import { useSession, signOut } from "next-auth/react"
import './signout.scss'

function SignOutButton() {

    const { data: session } = useSession()

    
    if (session) return (
        <div>
            <button 
                className='signout-button'
                onClick={() => signOut()}>
                    Sign out
            </button>
        </div>
    ) 
}

export default SignOutButton;