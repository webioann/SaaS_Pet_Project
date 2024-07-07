import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect";
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcryptjs"
import { signIn } from 'next-auth/react'; 

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        await connect();
        const user = await User.findOne({ email })
        console.log('USER', user)
        if(user) {
            await signIn('credentials', { email, password })
            res.status(200).json({ success: true })
        }
        else {throw new Error('ERROR IN TIME LOGIN')}
    } catch (error) {
        if (error.type === 'CredentialsSignin') {
            res.status(401).json({ error: 'Invalid credentials.' })
        } else {
            res.status(500).json({ error: 'Something went wrong.' })
        }
    }
}
