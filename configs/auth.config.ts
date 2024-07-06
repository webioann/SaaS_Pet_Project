import NextAuth, { NextAuthOptions } from "next-auth"
import { Account, User as AuthUser } from "next-auth";
// import { signIn, useSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '../models/UserSchema'
import connect from "../lib/connect";
import { redirect } from "next/navigation";

export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'email', required: true},
                password: {label: 'password', type: 'password', required: true},
            },
            async authorize(credentials) {
                // get email and password from User form
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                }
                // check if User exists on MongoDB
                await connect();
                const user = await User.findOne({ email })
                const passwordsMatch = await bcrypt.compare(password, user.password)
                if(user && passwordsMatch) {
                    return user
                }
                if(user && !passwordsMatch) {
                    redirect('/signup')
                }
                if (!user) { return null }
            }       
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: { 
        signIn: '/api/auth/signup',
    }
}
