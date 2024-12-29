import { User } from "@/app/models/user";
import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";


export async function GET(request,{params}) {
    const {userId} = params;

    try {
        await connectDb();
        const user = await User.findById(userId).select("-password");

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Failed to get user",
            success:false,
        });
    }
  }

export async function DELETE(request,{params}) {
    const {userId} = params;

    try {
        await connectDb();
        await User.deleteOne({
            _id:userId
        });

        return NextResponse.json({
            message:"deleted",
            success:true,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Failed to delete user",
            success:false,
        });
    }
  }

  export async function PUT(request,{params}) {
    const {userId} = params;
    const {name,password,about,profile} = await request.json();

    try {
        const user = await User.findById(userId);
        user.name = name;
        user.password = password;
        user.about = about;
        user.profile = profile;
        const updatedUser = await user.save();

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Failed to update user",
            success:false,
        });
    }
  }