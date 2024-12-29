"use client"
import UserContext from "@/context/userContext";
import { deleteTask, getTaskOfUser } from "@/services/taskServices";
import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { toast } from "react-toastify";


function ShowTask() {
    const [tasks,setTaks] = useState([]);
    const context = useContext(UserContext);
    async function loadTask(userId){
        try {
            const tasks = await getTaskOfUser(userId);
            // console.log(tasks);
            setTaks([...tasks].reverse());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(context.user)
        {
            loadTask(context.user._id);
        }
    },[context.user]);

    async function deleteTaskParent(taskId)
    {
        try {
            const result = await deleteTask(taskId);
            
            const newTask = tasks.filter(item=>item._id!=taskId);
            setTaks(newTask);
        } catch (error) {
            console.log(error);
            toast.error("Error in deleteing task",{
                position:"top-center",
            });
        }

    }

  return (
    <div className='grid grid-cols-12'>
        <div className="col-span-6 col-start-4">
            <h1 className='font-semibold text-center text-3xl'>Your Task ({tasks.length}) </h1>
            {
                tasks.map((task)=>
                    <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent}/>
                )
            }
        </div>
    </div>
  )
}

export default ShowTask;