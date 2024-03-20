import TestDataSchema from "../../../models/TestDataSchema"
import connect from "../../../lib/connect"
import { NextResponse } from "next/server"

export async function GET(request) {
    try{
        // await connect();
        // const data = await TestDataSchema.find()
        return new NextResponse('This is data from TestData DB', {status: 200})
    }catch(error) {
        return new NextResponse('Error in response from TestData DB', {status: 500})
    }
}