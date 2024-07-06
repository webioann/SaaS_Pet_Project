'use client'
import React, { useState } from 'react'
import GoogleSigninButton from '../GoogleSigninButton/GoogleSigninButton';
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";
import { HiOutlineMail } from 'react-icons/hi'
import { LoginFormDataType } from '../../types/auth.types';
import Link from 'next/link'
import './form.scss'

function LogInForm() {
    const router = useRouter()

    const [formData,setFormData] = useState<LoginFormDataType>({
        email: '',
        password: ''
    })
    const [error,setError] = useState<string | null>(null)


    const loginForAuthedUser = async (event) => {
        event.preventDefault();
        if(formData.email.length > 7 && formData.password.length > 5) {
            try {
                const res = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });
                if (!res) {
                    setError("Invalid Credentials");
                    return;
                }
                router.push('/')
            } catch (error) {
                console.log(error);
            }
        }
        else return
    }
    return (
        <form onSubmit={(event) => loginForAuthedUser(event)} className='form'>
            <div className='wrapper'>
                <h1 className='form-title'>Login account</h1>
                <p className='form-subtitle'>use your password and email</p>
                {/* email */}
                <div className='input-wrapper'>
                    <label>Email</label>
                    <input 
                        name='email' 
                        type='text'
                        placeholder='John Doe'/>
                </div>
                {/* password */}
                <div className='input-wrapper'>
                    <label>Password</label>
                    <input 
                        name='password'
                        type='password' 
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