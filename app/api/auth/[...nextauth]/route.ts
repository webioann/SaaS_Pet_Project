import NextAuth, { NextAuthOptions } from "next-auth"
import { Account, User as AuthUser } from "next-auth";
// import { signIn, useSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: 'cool email' },
                password: { label: "Password", type: "password", placeholder: 'cool password' }
            },
            async authorize(credentials) {
                try {
                    await connect();
                    if(credentials?.email && credentials.password) {
                        const user = await User.findOne({ email: credentials.email });
                        if (user) {
                            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                            if (isPasswordCorrect) { return user }
                            if (!isPasswordCorrect) { return null }
                        } 
                        else { return null }
                    }
                    else { return null }
                } catch (err: any) {
                    throw new Error(err);
                }
            }
        })
    ],
    // callbacks: {
    //     async signIn({ user, account }: { user: any; account: any }) {
    //         if (account.provider === "credentials") {
    //             try {
    //             const { name, email } = user;
    //             await connect();
    //             const ifUserExists = await User.findOne({ email });
    //             if (ifUserExists) {
    //                 return user;
    //             }
    //             const newUser = new User({
    //                 name: name,
    //                 email: email,
    //             });
    //             const res = await newUser.save();
    //             if (res.status === 200 || res.status === 201) {
    //                 console.log(res)
    //                 return user;
    //             }
    //             } catch (err) {
    //             console.log(err);
    //             }
    //         }
    //         return user;
    //     },
    //     async jwt({ token, user }) {
    //         if (user) {
    //             token.email = user.email;
    //             token.name = user.name;
    //         }
    //         return token;
    //     },
    //     async session({ session, token }: { session: any; token: any }) {
    //         if (session.user) {
    //             session.user.email = token.email;
    //             session.user.name = token.name;
    //         }
    //         console.log(session);
    //         return session;
    //     },
        
    // },
    secret: process.env.NEXTAUTH_SECRET!,
    // pages: { signIn: "/" }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }