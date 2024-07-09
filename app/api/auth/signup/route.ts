import connect from "../../../../../lib/connect";
import User from '../../../../../models/UserSchema'

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request) {
  try {
    //extract the credentials
    const { name, email, password } = await request.json();
    //Check if the user Already exists in the db
    await connect();
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.findOne({ email })  
    if (user) {
      return NextResponse.json(
        {
          data: null,
          message: `User with this email ( ${email})  already exists in the Database`,
        },
        { status: 409 }
      );
    }
    // create a new User
    const newUser = await User.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    return NextResponse.json(
      {
        data: newUser,
        message: "User Created Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something went wrong",
      },
      { status: 500 }
    );
  }
}
// export async function GET(request) {
//   try {
//     const users = await User.find({
//     });
//     return NextResponse.json(users);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: "Failed to Fetch Users",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }