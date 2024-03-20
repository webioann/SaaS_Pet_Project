import Posts from "../../../models/Posts"
import connect from "../../../lib/connect"
import { NextResponse } from "next/server"

export async function GET(req) {
        try{
                const posts = await Posts.find()
                return NextResponse.json({ posts }, {status: 200})
        }
        catch(error) {
                return NextResponse.json({message: 'GET Error --> ', error}, {status: 500})
        }
};

export async function POST(request) {
        try{
                const body = await request.json()
                const posts = body.postData
                await Posts.create(posts)
                return NextResponse.json({message: 'Posted ...'}, {status: 201})
        }
        catch(error) {
                return NextResponse.json({message: 'POST Error --> ', error}, {status: 500})
        }
}
