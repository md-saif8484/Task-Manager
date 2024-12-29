"use client"
import React, { useState } from 'react'
import signup from '../assests/signup.svg'
import Image from 'next/image';
import { toast } from 'react-toastify';
import { SignUpService } from '@/services/userService';

function SignUp() {

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        about:"",
        profile:"data:image/png;base64,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"
      });

    const  handleSignup = async (event) => {
        event.preventDefault();
        // console.log(user);

        if(user.name.trim()=="" || user.name==null)
        {
            toast.warning("Name is required",{
                position:'top-center'
            });
            return ;
        }

        try {
            const result = await SignUpService(user);
            console.log(result);
            toast.success("user added successfully",{
                position:'top-center'
            });
            setUser({
                name:"",
                email:"",
                password:"",
                about:"",
                profile:"data:image/png;base64,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"
            });
        } catch (error) {
            console.log(error);
            toast.error("signup error!! " +  error.response.data.message,{
                position:'top-center'
            });
        }
        

    }

  return (
    <div className='grid grid-cols-12 bg-gray-200'>
    <div className='col-span-6 col-start-4 shadow-sm shadow-sky-800 m-2 '>
          <div className='flex justify-center'>
            <Image src={signup} alt="login" style={ {width:"50%",height:"200px"}}/>
          </div>
          <h1 className='text-center font-bold py-2'>Signup here</h1>
          <form action="" onSubmit={handleSignup}>
              
              <div className="mb-6">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" id="user-name" name="user-name" className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500
                      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event)=> {
                            setUser({
                                ...user,
                                name:event.target.value,
                            });
                          }}
                          value={user.name}
                        />
              </div>

              <div className="mb-6">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" id="user-email" name="user-email" className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500
                      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event)=> {
                            setUser({
                                ...user,
                                email:event.target.value,
                            });
                          }}
                          value={user.email}
                        />
              </div>

              <div className="mb-6">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" id="user-password" name="user-password" className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500
                      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event)=> {
                            setUser({
                                ...user,
                                password:event.target.value,
                            });
                          }}
                          value={user.password}
                        />
              </div>

              <div className="mb-6">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
                  <textarea type="text" id="user-about" name="user-about" className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500
                      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event)=> {
                            setUser({
                                ...user,
                                about:event.target.value,
                            });
                          }}
                          value={user.about}
                        />
              </div>

              {/* <div className="mb-6">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile</label>
                  <input type="file" id="user-profile" name="user-profile" 
                        
                        />
              </div> */}
              
              

              <div className='flex justify-center mb-2'>
                  <button type="submit" className='bg-green-500  mr-3 hover:bg-green-300 px-3 py-2 rounded-xl '>Submit</button>
              </div>


              </form>
             

      </div>
    
     
    </div>
  )
}

export default SignUp;