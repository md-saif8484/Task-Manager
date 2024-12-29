import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import Swal from 'sweetalert2';

function Task({task,deleteTaskParent}) {
    function deleteTask(taskId)
    {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              // Call the deleteTask function if the user confirms
              deleteTaskParent(taskId);
      
              // Show success alert after deletion
              Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
              );
            }
          });
    }
  return (
  <div className={` text-white m-2 rounded-md shadow-lg + ${task.status=="completed" ? "bg-green-800" : "bg-gray-800"}`}>
    <div className='p-5'>
        <div className='flex justify-between'>
            <h1 className='font-semibold text-xl'>{task.title.toUpperCase()}</h1>
            <span onClick={()=>{
                deleteTask(task._id)
            }} className='shadow-lg bg-red-900 hover:bg-red-400 rounded-full cursor-pointer w-8 h-8 flex justify-center items-center'>
                <RxCrossCircled />
            </span>
            
        </div>
        {/* Thin Line (horizontal rule) */}
        <hr className="border-t border-gray-400 my-2" />
        <p className='font-thin'>{task.content}</p>
        <div className='flex justify-end'>
            <p>status : {task.status}</p>
        </div>
    </div>

  </div>
  );
}

export default Task