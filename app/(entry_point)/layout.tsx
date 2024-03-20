import React, { ReactNode } from 'react'
import Image from 'next/image'
import styles from './entry_point.module.scss'
import AuthPageFooter from '../../components/AuthPageFooter/AuthPageFooter'
import AuthContextProvider from '../../context/AuthContextProvider'
import Navbar from '../../components/Navbar/Navbar'

function EntryPointLayout({ children }: {children: ReactNode}) {
    
    return (
        <main className={styles.container}>
            <Navbar/>
            <Image 
                src={require('../../public/login_background.jpg')}
                className={styles.bg_image} 
                alt='page bg'
                priority 
                fill
            />
            {children}
            <AuthContextProvider>
                <AuthPageFooter/>

            </AuthContextProvider>
        </main>
    )
}

export default EntryPointLayout;