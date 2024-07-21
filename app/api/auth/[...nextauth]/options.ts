import type{ NextAuthOptions, User as type, RequestInternal } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect"
import { signIn } from "next-auth/react";


export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // authorization: {
            //     params: {
            //         prompt: "HELLO",
            //         access_type: "offline",
            //         response_type: "code"
            //     }
            // }
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                name: {label: 'Name', type: 'text', required: true},
                email: {label: 'Email', type: 'email', required: true},
                password: {label: 'Password', type: 'password', required: true},
            },
            async authorize(credentials, req) {
                try{
                    if( credentials?.email && credentials.password ) {
                        // check if User exists on MongoDB
                        await connect();
                        const user = await User.findOne({ email: credentials.email })
                        // const hashedPassword = await bcrypt.hash(credentials.password, 10)
                        if(user) {
                            const passwordsMatch = await bcrypt.compare(credentials.password, user.password)

                            console.log('USER_DOC --> ', user._doc)
                            return user._doc
                        }
                        if ( !user ) { 
                            throw new Error('Not found User on MongoDB')
                        }
                    }
                    // if some field is empty
                    if ( !credentials?.email || !credentials.password ) return null
                }
                catch(error) { { throw new Error('Not found User on MongoDB') }}  
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
