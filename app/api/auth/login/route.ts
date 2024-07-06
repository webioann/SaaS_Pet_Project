import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect";
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcryptjs"
import { signIn } from 'next-auth/react'; 

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    // try {
    //     const { name, email, password } = await req.json();
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     await connect();
    //     await User.create({ name, email, password: hashedPassword });
    //     console.log('SUCCESS-->', email, password)
    //     return NextResponse.json({ message: "User registered." }, { status: 201 });
    // } catch (error) {
    //     return NextResponse.json(
    //         { message: "An error occurred while registering the user." },
    //         { status: 500 }
    //     );
    // }
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
