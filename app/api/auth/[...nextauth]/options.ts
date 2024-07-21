import type{ NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect"

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
            async authorize(credentials, req) {
                try{
                    if( credentials?.email && credentials.password ) {
                        // check if User exists on MongoDB
                        await connect();
                        const user = await User.findOne({ email: credentials.email })
                        if(user) {
                            const passwordsMatch = await bcrypt.compare(credentials.password, user.password)
                            if(passwordsMatch) {
                                const { password, ...userWithoutPassword } = user._doc
                                // console.log('USER_DOC --> ', user._doc)
                                console.log('USER_WITHOUT_PASSWORD --> ', userWithoutPassword)
                                return userWithoutPassword
                            }
                            if(!passwordsMatch) { throw new Error('Not correct password') }
                        }
                        if(!user) { throw new Error('Not found User on MongoDB') }
                    }
                    if ( !credentials?.email || !credentials.password ) { throw new Error('Wrong email or password') }
                }
                catch(error) { throw new Error('Not found User on MongoDB') }
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
