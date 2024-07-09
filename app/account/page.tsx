'use server';
import { getServerSession } from "next-auth/next";
import { authConfig } from "../api/auth/[...nextauth]/new_options"
import Container from "../../components/Container/Container";
import Image from "next/image";

async function AccountPage() {
    const session = await getServerSession(authConfig)
    return (
        <main>
            <Container width={1200}>
                <h1>Account page</h1>
                <h2>USER name { session?.user?.name }</h2>
                <h2>USER name { session?.user?.email }</h2>
                { session?.user?.image && <Image src={session.user.image} width={100} height={100} alt="avatar"/> }
            </Container>
        </main>
        
    )
}

export default AccountPage;