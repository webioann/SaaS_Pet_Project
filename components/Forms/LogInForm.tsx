'use client'
import React, { useState, FormEventHandler } from 'react'
import GoogleSigninButton from '../GoogleSigninButton/GoogleSigninButton';
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";
import { HiOutlineMail } from 'react-icons/hi'
import { LoginFormDataType } from '../../types/auth.types';
import Link from 'next/link'
import './form.scss'

function LogInForm() {
    const router = useRouter()

    const handlesubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        try {
            const response = await signIn("credentials", {
                    email: formData.get('email'),
                    password: formData.get('password'),
                    redirect: false
                })
                console.log('RES Login---------> ', response)
                if (response && !response.error) { router.push('/') }
                else { throw new Error('Failed on Login Form') }
            } catch (error) { throw new Error('ERROR in login form') }
    }

    return (
        <form onSubmit={handlesubmit} className='form'>
            <div className='wrapper'>
                <h1 className='form-title'>Login account</h1>
                <p className='form-subtitle'>use your password and email</p>
                {/* email */}
                <div className='input-wrapper'>
                    <label>Email</label>
                    <input 
                        name='email' 
                        type='email'
                        required
                        placeholder='John Doe'/>
                </div>
                {/* password */}
                <div className='input-wrapper'>
                    <label>Password</label>
                    <input 
                        name='password'
                        type='password'
                        required 
                        placeholder='john@examole.com'/>
                </div>
                {/* submit button */}
                <button type='submit' className='submit-button'>Login</button>
                <GoogleSigninButton/>
                {/* redirect link */}
                <div className='redirect'>
                    <p className='question'>New in platform?</p>
                    <Link href="/signup" className='old-link'>
                        Signup
                    </Link> 
                </div>
            </div>
        </form>
    )
}

export default LogInForm;


    // const loginForAuthedUser: FormEventHandler<HTMLFormElement> = async (event) => {
    //     event.preventDefault()
    //     const formData = new FormData(event.currentTarget)
    //     const email = formData.get('email') as string
    //     const password = formData.get('password') as string

    //     if(email.length > 7 && password.length > 5) {
    //         try {
    //             const response = await fetch('/api/login', {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     email,
    //                     password 
    //                 }),
    //                 headers: { 
    //                     'Content-Type': 'application/json' 
    //                 },
    //             })
    //             if(response) {
    //                 await signIn("credentials", {
    //                     email,
    //                     password,
    //                     redirect: false
    //                 })
    //             }
    //             if (!response) { throw new Error('Failed on Login Form') }
    //             router.push('/')
    //         } catch (error) { throw new Error('ERROR in login form') }
    //     }
    //     else return
    // }
