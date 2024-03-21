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
    const [inputType,setInputType] = useState<string>('password')
    const [emailFocus, setEmailFocus] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false)

    const [formData,setFormData] = useState<FormDataType>({
        name: 'USER',
        email: '',
        password: ''
    })

    const createNewUserAccount = async (event) => {
        event.preventDefault()
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
            const res = await signIn("credentials", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                redirect: false,
            });
        }
        router.push('/')
        console.log(response)
    }


    const [warning,setWarning] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)
    
    // const closePopup = () => setWarning(false)


    const showPassword = () => {
        inputType === 'password' ? setInputType('text') : setInputType('password')
    }
    const loginWithEmail = () => {console.log('LOGIN BUTTON IS CLICKED')}


    return (
        <form className='form' onSubmit={createNewUserAccount}>
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
                        ? <GoEye className='input-icon' onClick={showPassword}/> 
                        : <GoEyeClosed className='input-icon' onClick={showPassword}/>
                    }
                </div>
            </div>
            <button className={`${button.g_button} auth-button`}>
                { type === 'login' ? 'Login with email' : 'Signup with email'}
            </button>
        </form>
    )
}

export default RegistrationForm;