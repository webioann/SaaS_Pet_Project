'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.scss'
import type { langType } from '../../types/lang.types'

const Navbar = () => {

    const[lang, setLang] = useState<langType>('eng')

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href='/'>
                    <Image src='/logo.jpg' width={40} height={40} alt='app logo'/>
                </Link>
            </div>
            <div className={styles.links_block}>
                <Link href='/users' className={styles.link}>Users link</Link>
                <Link 
                    href='/about/eng' 
                    className={lang === 'eng' ? `${styles.link} ${styles.active}` : styles.link}>
                        <span onClick={() => setLang('eng')}>
                            english
                        </span>
                </Link>
                <Link 
                    href='/about/fra' 
                    className={lang === 'fra' ? `${styles.link} ${styles.active}` : styles.link}>
                        <span onClick={() => setLang('fra')}>
                            france
                        </span>
                </Link>
                <Link 
                    href='/about/ukr' 
                    className={lang === 'ukr' ? `${styles.link} ${styles.active}` : styles.link}>
                        <span onClick={() => setLang('ukr')}>
                            ukrainian
                        </span>
                </Link>
            </div>
        </nav>
    )
}
export default Navbar;