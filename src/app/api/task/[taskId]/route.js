import { Task } from "@/app/models/task";
import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    const {taskId} = params;

    try {
        await connectDb();
        const task = await Task.findById(taskId);
        return NextResponse.json(task);
    } catch (error) {
        console.log(error);
        return getResponseMessage("failed to get task",false,404);
    }
}

export async function DELETE(request,{params}) {
    const {taskId} = params;

    try {
        await connectDb();
        await Task.findByIdAndDelete(taskId);
        return getResponseMessage("deleted successfully",true,200);
    } catch (error) {
        console.log(error);
        return getResponseMessage("failed to delete task",false,404);
    }
}


export async function PUT(request,{params}) {
    const {taskId} = params;
    const {title,content,status} = await request.json();
    try {
        let task = await Task.findById(taskId);
        task.title = title;
        task.content = content;
        task.status = status;
        const updatedTask = await task.save();
        return NextResponse.json(task);
    } catch (error) {
        console.log(error);
        return getResponseMessage("failed to update task",false,404);
    }
}


