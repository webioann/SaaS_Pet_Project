import React from 'react'
import Link from 'next/link'
import RegistrationForm from '../../../components/RegisterForm/RegisterForm'
import styles from '../register_pages.module.scss'

function LoginPage() {
    return (
        <section className={styles.register_page}>
            <h1 className={styles.auth_header}>Login</h1>
            <RegistrationForm/>
            <div className={styles.question}>
                <p className={styles.question_text}>New to Netflix?</p>
                <Link href="/signup" className={`${styles.question_link} ${styles.link}`}>Sign up now.</Link> 
            </div>
            <p className={styles.captcha}>
                This page is protected by Google reCAPTCHA to ensure you're not a bot. 
                <span className={`${styles.captcha_link} ${styles.link}`}>Learn more.</span> 
            </p>

        </section>
    )
}

export default LoginPage;
