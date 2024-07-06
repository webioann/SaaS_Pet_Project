"use client";  
import React from 'react'
import { signOut } from "next-auth/react"
import './signout.scss'

function SignOutButton() {
    
    return (
        <div>
            <button 
                className='signout-button'
                onClick={() => signOut({callbackUrl: '/'})}>
                    Sign out
            </button>
        </div>
    ) 
}

export default SignOutButton;