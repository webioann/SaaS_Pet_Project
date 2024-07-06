'use client'
import React, { useState } from 'react'
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

    const createNewUserAccount = async (event) => {
        event.preventDefault();
        if(formData.email.length > 7 && formData.password.length > 5) {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
                headers: {
                    "Content-type": "application/json",
                },
            })
            if(!response.ok) { throw new Error('Failed on RegisterForm') }
            if(response.ok) {
                await signIn("credentials", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });
            }
            router.push('/')
            console.log(response)
        }
        else return
    }



    return (
        <form onSubmit={(event) => createNewUserAccount(event)} className='form'>
            <div className='wrapper'>
                <h1 className='form-title'>Login account</h1>
                <p className='form-subtitle'>use your password and email</p>
                {/* name */}
                <div className='input-wrapper'>
                    <label>Name</label>
                    <input 
                        name='name' 
                        type='text'
                        placeholder='John Doe'/>
                </div>
                {/* email */}
                <div className='input-wrapper'>
                    <label>Email</label>
                    <input 
                        name='email' 
                        type='text'
                        placeholder='john@examole.com'/>
                </div>
                {/* password */}
                <div className='input-wrapper'>
                    <label>Password</label>
                    <input 
                        name='password'
                        type='password' 
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