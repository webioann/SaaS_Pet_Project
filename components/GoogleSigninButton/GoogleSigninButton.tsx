'use client';
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import connect from "../../lib/connect";
import User from '../../models/UserSchema'
import './google-button.scss'

function GoogleSigninButton() {

    const { data, status } = useSession();


    return ( 
        <button 
            className='signin-button'
            onClick={() => signIn('google', { callbackUrl: '/' })}>
                Google
        </button>
    )
}

export default GoogleSigninButton;
// 