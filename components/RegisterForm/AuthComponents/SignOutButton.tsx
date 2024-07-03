"use client"
import React from 'react'
import { useSession, signOut } from "next-auth/react"

function SignOutButton() {

    const { data: session } = useSession()

    if(session) {
        return (
            <div>
                <button 
                    style={{color: 'red'}}
                    onClick={() => signOut()}>
                        Sign out
                </button>
            </div>
        )
    }
    else {
        return (
            <h1 style={{color: 'red'}}>You not loged in your account</h1>
        )
    }
}

export default SignOutButton;