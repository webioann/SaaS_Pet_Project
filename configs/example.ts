import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from './client'
import { compare } from "bcrypt";
import { User } from "@prisma/client";
import NextAuth, { getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
        name: "Sign in",
        credentials: {
            email: {
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
            },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials) {
                return null;
            }
            if (!credentials?.email || !credentials.password) {
                return null
            }
            const user = await prisma.user.findUnique({
                where: {
                email: credentials.email
                }
            })

            if (!user) {
                return null
            }

            const isPasswordValid = await compare(
                credentials.password,
                user.password
            )

            if (!isPasswordValid) {
                return null
            }

            return {
                id: user.id + '',
                email: user.email,
                name: user.name,
                role: user.role,
                avatarUrl: user.avatarUrl
            }
        },
        }),
    ],
    callbacks: {
        jwt: ({token, user, session, trigger}) => {
        // console.log('JWT Callback', { token, user })
        // console.log('JWT Callback', { token, user, trigger, session });
        
        if (trigger === 'update' && session?.user) {
            return {
            ...token,
            name: session.user.name || token.name,
            email: session.user.email || token.email,
            avatarUrl: session.user.avatarUrl || token.avatarUrl,
            }
        }

        if(user) {
            const u = user as unknown as User
            return {
            ...token,
            id: u.id,
            role: u.role,
            avatarUrl: u.avatarUrl
            }
        }
        
        return token
        },
        session: ({session, token, user}) => {
        // console.log('Session Callback', { session, token })
        return {
            ...session,
            user: {
            ...session.user,
            id: token.id,
            role: token.role,
            avatarUrl: token.avatarUrl
            }
        }
        
        },
        
    },
    pages: {
        signIn: '/auth/signin',
    },

};
export const getServerAuthSession = () => getServerSession(authOptions);