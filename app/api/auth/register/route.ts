import connect from "../../../../lib/connect";
import User from '../../../../models/UserSchema'
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    //Check if the user Already exists in the db
    await connect();
    const user = await User.findOne({ email }) 
    if (user) {
      const passwordsMatch = await bcrypt.compare(password, user.password)
      // if User was authenticated and stored on MongoDB earlier
      if(passwordsMatch) {
        return NextResponse.json({
          message: `User with this email ( ${email})  already exists in the Database` },
          { status: 201 });
      }
      if(!passwordsMatch) {
        return NextResponse.json({
          message: "Not correct password" },
          { status: 401 });
      }
    }
    // create a fully new User
    if(!user) {
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({ name, email, password: hashedPassword });
      return NextResponse.json({
        message: "New User Created Successfully" },
        { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ 
      error, 
      message: "Server Error: Something went wrong in time Register route" },
      { status: 500 });
  }
}
