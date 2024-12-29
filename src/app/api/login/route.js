import { User } from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

export async function POST(request)
{
    const {email,password} = await request.json();

    try {
        // 1.get user
        await connectDb();
        const user = await User.findOne({ email: email });
        // console.log(user);
        // Check if user exists
        if(user==null)
        {
            throw new Error("user not found");
        }

        // Check if the password matches (assuming passwords are hashed)
        const isMatch = await bcrypt.compare(password, user.password);

        // password checking
        if (!isMatch) {
            throw new Error("Incorrect password");
        }

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user:user,
        });

        const token = jwt.sign({
            _id:user._id,
            name:user.name
        },process.env.JWT_TOKEN);

        response.cookies.set("auth_token", token, {
            httpOnly: true, // Ensures the cookie is not accessible via JavaScript
            expiresIn: "1 days", // 1 week expiration
        });

        // console.log(token);

        return response;

    } catch (error) {
        return NextResponse.json({
            message:error.message,
            success:false,
        },{
            status:500
        })
    }
}