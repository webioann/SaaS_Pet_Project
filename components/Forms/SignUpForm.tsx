'use client'
import React, { FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import GoogleSigninButton from '../GoogleSigninButton/GoogleSigninButton';
import { signIn } from "next-auth/react";
import { HiOutlineMail } from 'react-icons/hi'
import { SignUpFormDataType } from '../../types/auth.types';
import Link from 'next/link'
import './form.scss'

function SignUpForm() {
    const router = useRouter()

    const handlesubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        try {
            const response = await signIn("credentials", {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false
            })
            console.log('RES Signup---------> ', response)
            if (response && !response.error) { router.push('/') }
            else { throw new Error('Failed on Signup form') }
        } 
        catch (error) { throw new Error('ERROR in Signup form') }
    }

    return (
        <form onSubmit={handlesubmit} className='form'>
            <div className='wrapper'>
                <h1 className='form-title'>Sign up</h1>
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
                        placeholder='john@example.com'/>
                </div>
                {/* password */}
                <div className='input-wrapper'>
                    <label>Password</label>
                    <input 
                        name='password'
                        type='text'
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

export default SignUpForm;
    // const createNewUserAccount: FormEventHandler<HTMLFormElement>  = async (event) => {
    //     event.preventDefault()
    //     const formData = new FormData(event.currentTarget)
    //     const name = formData.get('name') as string
    //     const email = formData.get('email') as string
    //     const password = formData.get('password') as string

    //     if(email.length > 7 && password.length > 5) {
    //         try{
    //             const response = await fetch('/api/signup', {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     name,
    //                     email,
    //                     password
    //                 }),
    //                 headers: {
    //                     "Content-type": "application/json",
    //                 },
    //             })
    //             if(!response) { throw new Error('Failed on Signup Form') }
    //             if(response) {
    //                 await signIn("credentials", {
    //                     email: email,
    //                     password: password,
    //                     redirect: false,
    //                 });
    //             }
    //             router.push('/')
    
    //         }catch(error) { throw new Error('ERROR in signup form') }
    //     }
    //     else return
    // }
