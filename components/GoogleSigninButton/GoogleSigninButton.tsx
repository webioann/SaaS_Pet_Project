'use client';
import React from 'react'
import { signIn } from 'next-auth/react'
import './google-button.scss'

function GoogleSigninButton() {

    // const signin = async() => {
    //     const res = await signIn('google', {callbackUrl: '/'})
    //     console.log('Google button ----> ', res)
    // }
    return ( 
        <button 
            className='signin-button'
            onClick={() => signIn('google', {callbackUrl: '/'})}>
                Google
        </button>
    )
}

export default GoogleSigninButton;
// 