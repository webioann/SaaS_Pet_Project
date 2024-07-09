import type{ NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect";
import { redirect } from "next/navigation";
import type { CredentialsType, newUser } from "../../../../types/auth.types";

export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                name: {label: 'Name', type: 'text', required: true},
                email: {label: 'Email', type: 'email', required: true},
                password: {label: 'Password', type: 'password', required: true},
            },
            async authorize(credentials) {
                // get email and password from User form
                const { name , email, password } = credentials as CredentialsType
                // 
                if( email && password ) {
                    // check if User exists on MongoDB
                    // console.log("CREDENTIALS ====> ", name, email, password)

                    await connect();
                    const user = await User.findOne({ email })
                    const hashedPassword = await bcrypt.hash(password, 10)
                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    // if(user.email === email && user.password === hashedPassword) {
                    if(user) {
                        console.log("USER ====> ", user, hashedPassword, passwordsMatch)
                        if( user && passwordsMatch ) {
                            const { password, ...userWithoutPassword } = user
                            console.log('USER without password-->', userWithoutPassword)
                            return userWithoutPassword
                        }
                        if( user && !passwordsMatch ) { throw new Error('Email is correct but password is wrong')}
                    }
                    // create a new User
                    if ( !user ) { 
                        const raw = {
                            name: 'SUPER',
                            email: email,
                            password: hashedPassword
                        }
                        // const user = await User.create({ name, email, password: hashedPassword });
                        await connect();
                        await User.create(raw);
                        // const user = await User.findOne({ email })
                        console.log('!USER Was created')
                        return raw
                    }

                }
                // if some field is empty
                if ( !email || !password ) return null
            }       
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: { 
        signIn: '/register',
    }
}
