import React, { ReactNode } from 'react'
import Image from 'next/image'
import styles from './entry_point.module.scss'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import image from '../../public/tech_bg.jpg'

async function EntryPointLayout ({ children }: {children: ReactNode}) {
    const session = await getServerSession(authOptions)
    // if (session) redirect("/");
    return (
        <main className={styles.container}>
            <Image 
                src={image}
                className={styles.bg_image} 
                alt='page bg'
                priority 
                fill
            />
            {children}
        </main>
    )
}

export default EntryPointLayout;