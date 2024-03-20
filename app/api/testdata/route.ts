import TestData from "../../../models/TestDataSchema"
import connect from "../../../lib/connect"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
        await connect();
        const data = await TestData.find()
        return NextResponse.json(data, {status: 200})
}