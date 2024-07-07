'use client';
import React from 'react'
import { signIn } from 'next-auth/react'
import './google-button.scss'

function GoogleSigninButton() {
    return (
        <button 
            className='signin-button'
            onClick={() => signIn('google')}>
                Google
        </button>
    )
}

export default GoogleSigninButton;