"use client";
import React, { useState } from 'react'
import addtask from "../assests/addtask.svg"
import Image from 'next/image';
import { addTask } from '@/services/taskServices';
import {toast} from 'react-toastify';


const AddTask = () => {

  const [task,setTask] = useState({
    title:"",
    content:"",
    status:"none",
    userId:"675c1656f81273f38754f7bd",
  });

  const  handleAddTask = async (event) => {
    event.preventDefault();
    console.log(event.target);
    // validate task

    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Your task is added",{
        position:'top-center',
      });

      setTask({
        title:"",
        content:"",
        status:"none",
      })
    } catch (error) {
      console.log(error);
      toast.error("failed to add task",{
        position:'top-center',
      });
    }

  };
    
  return (
    <div className='grid grid-cols-12 bg-gray-200'>
      <div className='col-span-6 col-start-4 shadow-sm shadow-sky-800 m-2 '>
            <div className='flex justify-center'>
              <Image src={addtask} alt="login" style={ {width:"50%",}}/>
            </div>
            <h1 className='text-center font-bold py-2'>Add your task here</h1>
            <form action="" onSubmit={handleAddTask}>
                
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="task-title" name="task-title" className="bg-gray-50 border border-gray-300
                      text-gray-900 text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                          dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(event)=> {
                            setTask({
                                ...task,
                                title:event.target.value,
                            });
                          }}
                          value={task.title}
                          />
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                    <textarea type="text" id="task-content" name="task-content" className="block w-full p-4 text-gray-900 border
                      border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500
                        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                          dark:focus:border-blue-500"
                          onChange={(event)=> {
                            setTask({
                                ...task,
                                content:event.target.value,
                            });
                          }}
                          value={task.content}
                          />
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <select id="task-status" name="task-status" className="bg-gray-50 border border-gray-300 mb-5
                      text-gray-900 text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                          dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          onChange={(event)=> {
                            setTask({
                                ...task,
                                status:event.target.value,
                            });
                          }}
                          value={task.status}

                          >
                      <option value="none" disabled>--Not Selected--</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                </div>

                <div className='flex justify-center mb-2'>
                    <button className='bg-blue-500  mr-3 hover:bg-blue-900 px-3 py-2 rounded-xl'>Add</button>
                    <button className='bg-red-500  mr-3 hover:bg-red-900 px-3 py-2 rounded-xl'>Reset</button>
                </div>
                
            </form>
      </div>
      
      

    </div>
  )
}

export default AddTask;