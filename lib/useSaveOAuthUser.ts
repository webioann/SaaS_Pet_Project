'use client';
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { time } from 'console';

type OAuthProvider = 'google' | 'github'

export const useSaveOAuthUserOnDB = (provider: OAuthProvider) => {

    const { data, status } = useSession()
    const router = useRouter()

    const  afterSigninSaveUserOnMongoDB = async () => {
        try {
            if(data && status === 'authenticated') {
                const response = await fetch('api/auth/register', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        name: data?.user?.name,
                        email: data?.user?.email,
                        password: 'password',
                        image: data?.user?.image,
                        provider: provider
                    })
                })
                if(response.ok) { router.push('/') }
                if(!response.ok) { throw new Error('Response not OK') }
            }
        } 
        catch (error) { throw new Error('ERROR in Sign In form') }
    }
    
    useEffect(() => {
        status === 'authenticated' && afterSigninSaveUserOnMongoDB()
    }, [status])
}

