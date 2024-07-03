import React from 'react'
import styles from './form.module.scss'

function LogInForm() {
    return (
        <form 
            className={styles.form}
            action={() => console.log('Log in action')}>
            <input name='email'/>
            <input name='password'/>
            <button >Sign up</button>
        </form>
    )
}

export default LogInForm;