'use client'
import React from 'react'
import Link from 'next/link'
import RegistrationForm from '../../../components/RegisterForm/RegisterForm'
import LogInForm from '../../../components/Forms/LogInForm'
import styles from '../register_pages.module.scss'

function LoginPage() {
    return (
        <section className={styles.register_page}>
            <h1 className={styles.auth_header}>Login</h1>
            {/* <RegistrationForm type='login'/> */}
            <LogInForm/>
        </section>
    )
}

export default LoginPage;
