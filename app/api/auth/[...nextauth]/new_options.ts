import type{ NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect";

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
                // const { name , email, password } = credentials as CredentialsType
                try{
                    if( credentials?.email && credentials.password ) {
                        // check if User exists on MongoDB
                        await connect();
                        const user = await User.findOne({ email: credentials.email })
                        const hashedPassword = await bcrypt.hash(credentials.password, 10)
                        const passwordsMatch = await bcrypt.compare(credentials.password, user.password)
                        // if(user.email === email && user.password === hashedPassword) {
                        if(user) {
                            if( user && passwordsMatch ) {
                                const { password, ...userWithoutPassword } = user
                                console.log('USER without password-->', userWithoutPassword)
                                return userWithoutPassword
                            }
                            if( user && !passwordsMatch ) { throw new Error('Email is correct but password is wrong')}
                        }
                        if ( !user ) { throw new Error('Not found User on MongoDB') }
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
    // pages: { 
    //     signIn: '/signin',
    // }
}
