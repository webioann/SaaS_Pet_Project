import React, { ReactNode } from 'react'
import Image from 'next/image'
import styles from './entry_point.module.scss'

function EntryPointLayout({ children }: {children: ReactNode}) {
    
    return (
        <main className={styles.page_wrapper}>
            <Image 
                src={require('../../public/login_background.jpg')}
                className={styles.bg_image} 
                alt='page bg'
                priority 
            />
            {children}
        </main>
    )
}

export default EntryPointLayout;