import connect from "../../../../lib/connect";
import User from '../../../../models/UserSchema'
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    //check if the user already exists in the MongoDB
    await connect();
    const user = await User.findOne({ email }) 
    if (user) {
      const passwordsMatch = await bcrypt.compare(password, user.password)
      // if User was authenticated and stored on MongoDB earlier
      if(passwordsMatch) {
        return NextResponse.json({
          message: `User with this email ( ${email} ) already exists in the MongoDB` },
          { status: 201 });
      }
      if(!passwordsMatch) {
        return NextResponse.json({
          message: `Not correct password for ${email} account`  },
          { status: 401 });
      }
    }
    // create a fully new User
    if(!user) {
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({ name, email, password: hashedPassword });
      return NextResponse.json({
        message: `New User ${ name ? name : email } Created Successfully` },
        { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ 
      error, 
      message: "Server Error: Something went wrong in time Register route" },
      { status: 500 });
  }
}
