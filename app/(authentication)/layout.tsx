'use server'
import React, { ReactNode } from 'react'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../configs/authOptions.config"
import Container from '../../components/Container/Container';

async function EntryPointLayout ({ children }: {children: ReactNode}) {
    const session = await getServerSession(authOptions)
    console.log('SESSION', session)
    // if (session) redirect("/");
    return (
        <Container width={1200}>
            {/* <Image 
                src={image}
                className={styles.bg_image} 
                alt='page bg'
                priority 
                fill
            /> */}
            {children}

        </Container>
    )
}

export default EntryPointLayout;