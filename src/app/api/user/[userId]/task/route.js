import { Task } from "@/app/models/task";
import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    const {userId} = await params;

    try {
        await connectDb();
        const tasks = await Task.find({
            userId:userId,
        });
        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return getResponseMessage("failed to get task",false,404);
    }
}