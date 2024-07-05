import User from '../../../models/UserSchema'
import connect from "../../../lib/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        await connect();
        // checking user exists on the MongoDB database 
        const userIsExist = await User.findOne({email})
        if( userIsExist ) return new NextResponse('Emai is already in use', {status: 400})
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ name, email, password: hashedPassword });
            console.log('SUCCESS-->', email, password)
            return NextResponse.json({ message: "User registered." }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}

