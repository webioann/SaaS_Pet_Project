import React from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import Link from 'next/link'
import './form.scss'

function LogInForm() {
    return (
        <form 
            className='form'
            action={() => console.log('Log in action')}
            >
            <div className='wrapper'>
                <h1 className='form-title'>Login account</h1>
                <p className='form-subtitle'>use your password and email</p>
                {/* email */}
                <div className='input-wrapper'>
                    <label>Email</label>
                    <input name='email' placeholder='John Doe'/>
                </div>
                {/* password */}
                <div className='input-wrapper'>
                    <label>Password</label>
                    <input name='password' placeholder='john@examole.com'/>
                </div>
                <button className='submit-button'>Login</button>
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