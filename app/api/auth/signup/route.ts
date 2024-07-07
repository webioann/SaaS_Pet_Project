import User from '../../../../models/UserSchema'
import connect from "../../../../lib/connect";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from 'next-auth/react'; 


import bcrypt from "bcryptjs"

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, email, password } = await req.body
        await connect();
        // checking user exists on the MongoDB database 
        const user = await User.findOne({email})
        if(user) {
            await signIn('credentials', { email, password })
            res.status(200).json({ success: true })
        }
        // if user not exists create new user and store in MongoDB
        if(!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ name, email, password: hashedPassword });
            await signIn('credentials', { email, password })
            res.status(200).json({ success: true })
            return NextResponse.json({ message: "User registered." }, { status: 201 });
        }
    } catch (error) {
        if (error.type === 'CredentialsSignin') {
            res.status(401).json({ error: 'Invalid credentials.' })
        } else {
            res.status(500).json({ error: 'Something went wrong.' })
        }
        // return NextResponse.json(
        //     { message: "An error occurred while registering the user." },
        //     { status: 500 }
        // );
    }
}

