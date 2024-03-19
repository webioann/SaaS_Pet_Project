'use client'
import React, { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { GoEye,GoEyeClosed } from 'react-icons/go'
import './register-form.scss'
import button from '../../app/index.module.scss'

const RegistrationForm = () => {
    // === one form for login and signup users ===
    const [inputType,setInputType] = useState<string>('password')
    const [emailFocus, setEmailFocus] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false)

    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [warning,setWarning] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)
    
    // const closePopup = () => setWarning(false)


    const showPassword = () => {
        inputType === 'password' ? setInputType('text') : setInputType('password')
    }
    const loginWithEmail = () => {console.log('LOGIN BUTTON IS CLICKED')}

    return (
        <form className='form'
            onSubmit={event => event.preventDefault()}>
            <div className='email-box'>
                <label className={emailFocus || email.length > 0 ? 'input-label-up' : 'input-label'}>
                    Email
                </label>
                <div className='email-input-box'>
                    <input className='reg-input'
                        onFocus={() => {
                            setEmailFocus(true)
                            setPasswordFocus(false)
                        }}
                        onBlur={() => {
                            email.length == 0 ? setEmailFocus(false) : setEmailFocus(true)
                        }}
                        type='email' 
                        onChange={event => setEmail(event.target.value)}/>
                    <HiOutlineMail className='input-icon'/>
                </div>
            </div>
            <div className='password-box'>
                <label className={passwordFocus || password.length > 0 ? 'input-label-up' : 'input-label'}>
                    Password
                </label>
                <div className='password-input-box'>
                    <input className='reg-input'
                        onFocus={() => {
                            setPasswordFocus(true)
                            setEmailFocus(false)
                        }}
                        onBlur={() => {
                            password.length == 0 ? setPasswordFocus(false) : setPasswordFocus(true)
                        }}
                        type={inputType} 
                        onChange={event => setPassword(event.target.value)}/>
                    {inputType === 'text' 
                        ? <GoEye className='input-icon' onClick={showPassword}/> 
                        : <GoEyeClosed className='input-icon' onClick={showPassword}/>
                    }
                </div>
            </div>
            <button className={`${button.g_button} auth-button`} onClick={loginWithEmail}>
                Login with email
            </button>
        </form>
    )
}

export default RegistrationForm;