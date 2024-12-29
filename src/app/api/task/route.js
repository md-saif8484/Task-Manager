import { Task } from "@/app/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { connectDb } from "@/helper/db";

export async function GET(request) {
    try {
        await connectDb();
        const task = await Task.find();
        return NextResponse.json(task);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"failed to get task",
            success:false,
        });
    }
}

export async function POST(request) {
    const {title,content,status,userId} = await request.json();
    const token = await request.cookies.get("auth_token")?.value;
    const data = jwt.verify(token, process.env.JWT_TOKEN);
    
    try {
        const task = new Task({
            title,content,status,
            userId:data._id,
        });
        await connectDb();
        const createdTask =await task.save();
        return NextResponse.json(createdTask,{
            status:201,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"failed to create tasks",
            success:false,
        },{
            status:500,
        });
    }
}
