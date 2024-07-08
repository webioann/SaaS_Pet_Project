import NextAuth, { NextAuthOptions } from "next-auth"
import { Account, User as AuthUser } from "next-auth";
// import { signIn, useSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect";
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
                name: {label: 'name', type: 'text', required: true},
                email: {label: 'email', type: 'email', required: true},
                password: {label: 'password', type: 'password', required: true},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                // get email and password from User form
                const { email, password } = credentials as {
                    name: string,
                    email: string;
                    password: string;
                }
                // check if User exists on MongoDB
                await connect();
                const user = await User.findOne({ email })
                const passwordsMatch = await bcrypt.compare(password, user.password)
                if( user && passwordsMatch ) {
                    const { password, ...userWithoutPassword } = user
                    console.log('USER without password-->', userWithoutPassword)
                    return userWithoutPassword
                }
                if( user && !passwordsMatch ) { throw new Error('Email is correct but password is wrong')}
                // create a new User
                if ( !user ) { 
                    const hashedPassword = await bcrypt.hash(password, 10)
                    const user = await User.create({ name, email, password: hashedPassword });
                    console.log('USER -->', user)
                    return user
                }
            }       
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: { 
        signIn: '/signin',
    }
}
