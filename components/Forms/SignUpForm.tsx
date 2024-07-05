import React from 'react'

function SignUpForm() {
    return (
        <form action={() => console.log('Sign up action')}>
            <input name='name'/>
            <input name='name'/>
            <input name='name'/>
            <button >Sign up</button>
        </form>
    )
}

export default SignUpForm