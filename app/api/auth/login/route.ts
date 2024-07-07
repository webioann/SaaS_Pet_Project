import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect";
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcryptjs"
import { signIn } from 'next-auth/react'; 
import { redirect } from 'next/navigation';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = req.body
        await connect();
        const user = await User.findOne({ email })
        if(user) {
            await signIn('credentials', { email, password })
            res.status(200).json({ success: true })
        }
        if(!user) {
            redirect('/signup')
        }
    } catch (error) {
        if (error.type === 'CredentialsSignin') {
            res.status(401).json({ error: 'Invalid credentials.' })
        } else {
            res.status(500).json({ error: 'Something went wrong.' })
        }
    }
}
