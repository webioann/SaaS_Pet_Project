import NextAuth, { NextAuthOptions } from "next-auth"
import { Account, User as AuthUser } from "next-auth";
// import { signIn, useSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '../models/UserSchema'
import connect from "../lib/connect";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: { },
            async authorize(credentials) {
            const { name, email, password } = credentials as {
                name: string;
                email: string;
                password: string;
            }
            try {
                await connect();
                const user = await User.findOne({ email });
                if (!user) { return null }
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) { return null }
                return user;
            } catch (error) {
                console.log("Error: ", error);
            }
            },        
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET!,
    // pages: { signIn: "/" }
}
