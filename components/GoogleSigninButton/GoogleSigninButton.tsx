'use client';
import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import connect from "../../lib/connect";
import User from '../../models/UserSchema'
import './google-button.scss'

function GoogleSigninButton() {

    const { data, status } = useSession()

    // const signinAndSaveUserOnMongoDB = async() => {
    //     if(data && status === 'authenticated') {
    //         await connect();
    //         const user = await User.findOne({ email: data?.user?.email}) 
    //         if (user) {
    //             console.log('USER STORED')
    //         }
    //         if(!user) {
    //             await User.create({ email: data?.user?.email, name: data?.user?.name, password: 'EMPTY' });
    //             console.log('USER CREATED')
    //         }
    //     }
    //     else { return null }
    //     console.log('SSSSSS =====>')
    // }

    // useEffect(() => {
    //     status === 'authenticated' && signinAndSaveUserOnMongoDB()
    // }, [status])


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