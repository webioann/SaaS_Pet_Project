'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";
import { HiOutlineMail } from 'react-icons/hi'
import { GoEye,GoEyeClosed } from 'react-icons/go'
import './register-form.scss'
import button from '../../app/index.module.scss'

type FormProps = { type: 'signup' | 'login'}
type FormDataType = {
    name: string
    email: string
    password: string
}

const RegistrationForm:React.FC<FormProps> = ({type}) => {
    const router = useRouter()

    // === one form for login and signup users ===
    const [inputType,setInputType] = useState<'text' | 'password'>('password')
    const [emailFocus, setEmailFocus] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false)
    const [warning,setWarning] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)

    const [formData,setFormData] = useState<FormDataType>({
        name: 'USER',
        email: '',
        password: ''
    })

    const createNewUserAccount = async (event) => {
        event.preventDefault();
        if(formData.email.length > 7 && formData.password.length > 5) {
            const response = await fetch('/api/register', {
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
        // if type="signup" work one function if "login" other
        <form className='form' onSubmit={(event) => 
                type === 'signup' 
                ? createNewUserAccount(event) 
                : loginForAuthedUser(event)
            }>
             {/* EMAIL */}
            <div className='email-box'>
                <label className={emailFocus || formData.email.length > 0 ? 'input-label-up' : 'input-label'}>
                    Email
                </label>
                <div className='email-input-box'>
                    <input className='reg-input'
                        onFocus={() => {
                            setEmailFocus(true)
                            setPasswordFocus(false)
                        }}
                        onBlur={() => {
                            formData.email.length == 0 ? setEmailFocus(false) : setEmailFocus(true)
                        }}
                        type='email' 
                        onChange={event => setFormData({...formData, email: event.target.value})}/>
                    <HiOutlineMail className='input-icon'/>
                </div>
            </div>
            {/* PASSWORD */}
            <div className='password-box'>
                <label className={passwordFocus || formData.password.length > 0 ? 'input-label-up' : 'input-label'}>
                    Password
                </label>
                <div className='password-input-box'>
                    <input className='reg-input'
                        onFocus={() => {
                            setPasswordFocus(true)
                            setEmailFocus(false)
                        }}
                        onBlur={() => {
                            formData.password.length == 0 ? setPasswordFocus(false) : setPasswordFocus(true)
                        }}
                        type={inputType} 
                        onChange={event => setFormData({...formData, password: event.target.value})}/>
                    {inputType === 'text' 
                        ? <GoEye className='input-icon' onClick={() => setInputType('password')}/> 
                        : <GoEyeClosed className='input-icon' onClick={() => setInputType('text')}/>
                    }
                </div>
            </div>
            <button className={`${button.g_button} auth-button`}>
                { type === 'login' ? 'Login with email' : 'Signup with email'}
            </button>
            <button 
                className={`${button.g_button} auth-button`}
                onClick={() => signIn('google')}
                >
                Signin with Google
            </button>
        </form>
    )
}

export default RegistrationForm;