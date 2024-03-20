import TestData from "../../../models/TestDataSchema"
import connect from "../../../lib/connect"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req) {
        try{
                await connect();
                const data = await TestData.find()
                return NextResponse.json({data})
                // return new NextResponse(JSON.stringify(data), {status: 200})
                // return new NextResponse(data, {status: 200})
        }
        catch(error) {return NextResponse.json('RESPONSE ERROR', {status: 500})}
}