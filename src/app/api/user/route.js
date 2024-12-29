import { User } from "@/app/models/user";
import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function GET(request) {
    let users=[];
    try {
        await connectDb();
        users = await User.find().select("-password");
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"failed to get user !!",
            success:false,
        });
    }
  }
  
  export async function POST(request) {
    const {name,email,password,about,profile} = await request.json();
    const user = new User({
        name,
        email,
        password,
        about,
        profile,
    });
    try {
        const salt = await bcrypt.genSalt(10); // 10 rounds
        user.password = await bcrypt.hash(user.password, salt);
        await connectDb();
        const createdUser = await user.save();

        const response = NextResponse.json(createdUser,{
        status:201,
            });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"failed to create user",
            status:false,
        },{
            status:500
        });
    }
  }