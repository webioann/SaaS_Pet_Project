'use client'
import React, { useState, FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import GoogleSigninButton from '../GoogleSigninButton/GoogleSigninButton';
import { signIn } from "next-auth/react";
import { HiOutlineMail } from 'react-icons/hi'
import { SignUpFormDataType } from '../../types/auth.types';
import Link from 'next/link'
import './form.scss'

function SignUpForm() {
    const router = useRouter()

    const [formData,setFormData] = useState<SignUpFormDataType>({
        name: 'USER',
        email: '',
        password: ''
    })
    const [error,setError] = useState<string | null>(null)

    const createNewUserAccount: FormEventHandler<HTMLFormElement>  = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if(email.length > 7 && password.length > 5) {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
                headers: {
                    "Content-type": "application/json",
                },
            })
            if(!response) { throw new Error('Failed on Signup Form') }
            if(response) {
                await signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: false,
                });
            }
            router.push('/')
        }
        else return
    }



    return (
        <form onSubmit={createNewUserAccount} className='form'>
            <div className='wrapper'>
                <h1 className='form-title'>Login account</h1>
                <p className='form-subtitle'>use your password and email</p>
                {/* name */}
                <div className='input-wrapper'>
                    <label>Name</label>
                    <input 
                        name='name' 
                        type='text'
                        required
                        placeholder='John Doe'/>
                </div>
                {/* email */}
                <div className='input-wrapper'>
                    <label>Email</label>
                    <input 
                        name='email' 
                        type='email'
                        required
                        placeholder='john@examole.com'/>
                </div>
                {/* password */}
                <div className='input-wrapper'>
                    <label>Password</label>
                    <input 
                        name='password'
                        type='password'
                        required 
                        />
                </div>
                {/* submit button */}
                <button 
                    type='submit' 
                    className='submit-button'>
                    Sign up
                </button>
                <GoogleSigninButton/>
                {/* redirect link */}
                <div className='redirect'>
                    <p className='question'>Already have an account?</p>
                    <Link href="/login" className='old-link'>
                        Login
                    </Link> 
                </div>
            </div>
        </form>
    )
}

export default SignUpForm