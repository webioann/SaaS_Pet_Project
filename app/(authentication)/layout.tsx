'use server'
import React, { ReactNode } from 'react'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../../configs/auth.config"
import Container from '../../components/Container/Container';

async function EntryPointLayout ({ children }: {children: ReactNode}) {
    const session = await getServerSession(authConfig)
    if (session) redirect("/");

    return (
        <Container width={1200}>
            {children}
        </Container>
    )
}

export default EntryPointLayout;