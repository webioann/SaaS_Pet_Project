import React from 'react'
import RegistrationForm from '../../../components/RegisterForm/RegisterForm'
import styles from '../register_pages.module.scss'

function LoginPage() {
    return (
        <section className={styles.register_page}>
            <h1 className={styles.auth_header}>Login</h1>
            <RegistrationForm/>
        </section>
    )
}

export default LoginPage