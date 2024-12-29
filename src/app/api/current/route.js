import { User } from "@/app/models/user";
import { connectDb } from "@/helper/db";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";


export async function GET(request)
{
    
        // Access the token from the cookies
        const token = await request.cookies.get("auth_token")?.value;
        console.log("current--->",token);
        // if (!token) {
        //         return NextResponse.redirect('/login');  // Redirect to login if no token
        // }
                // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        
        // Assuming your JWT payload contains the user ID as "_id"
        await connectDb();
        const user = await User.findOne({ _id: decoded._id }).select("-profile -password");
        return NextResponse.json(user);
        
}