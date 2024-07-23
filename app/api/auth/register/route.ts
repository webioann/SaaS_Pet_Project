import connect from "../../../../lib/connect"
import User from '../../../../models/User_Model_Schema'
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { IUserModelSchema } from "../../../../models/User_Model_Schema"

export async function POST(request) {
  try {
    const { name, email, password, image, provider } = await request.json() as IUserModelSchema
    //check if the user already exists in the MongoDB
      await connect();
      const user = await User.findOne({ email }) 
      
      if (user && provider === 'credentials') {
        const passwordsMatch = await bcrypt.compare(password, user.password)
        // if User was authenticated and stored on MongoDB earlier
        if(passwordsMatch) {
          return NextResponse.json({
            message: `User with this email ( ${email} ) already exists in the MongoDB` },
            { status: 201 });
        }
        if(!passwordsMatch) {
          return NextResponse.json({
            error: `Not correct password for ${email} account`},
            { status: 501 });
        }
      }
      if (user && provider === 'google') {
        return NextResponse.json({
          message: `User with this email ( ${email} ) already exists in the MongoDB` },
          { status: 201 });
      }
      // create a fully new User
      if(!user) {
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ 
          name, 
          email, 
          password: provider === 'google' ? 'password' : hashedPassword,
          image, 
          provider,
          accountCreated: Number(new Date())
        });
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
