import User from '../../../models/UserSchema'
import connect from "../../../lib/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connect();
        await User.create({ name, email, password: hashedPassword });
        console.log('SUCCESS-->', email, password)
        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}

// export async function POST(request: Request) {
//     try{
//         const { email, password } = await request.json()
//         // need validate email and password here

//         console.log('SUCCESS ---',{ email, password })
//     }
//     catch(error) {
//         console.log(error)
//     }
// };

