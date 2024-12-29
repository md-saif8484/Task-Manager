"use client";
import React, { useContext, useState } from 'react'
import login_user from '../assests/login_user.svg'
import Image from 'next/image'
import { toast } from 'react-toastify';
import { LoginService } from '@/services/userService';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/userContext';

function Login() {
    const router = useRouter();
    const [data,setData] = useState({
        email:"",
        password:""
    });

    const context = useContext(UserContext);

    const handleLogin = async (event) =>{
        event.preventDefault();
        if(data.email.trim()==="" || data.password.trim()===""){
            toast.info("invalid data",{
                position:'top-center',
            });
            return;
        }

        try {
          const result = await LoginService(data);
          console.log(result);
          toast.success("Successfully login",{
            position:'top-center'
          });
          context.setUser(result.user);
          router.push("/show-tasks")
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message,{
            position:'top-center'
          });
        }
    }

  return (
    <div className='grid grid-cols-12'>
    <div className='col-span-6 col-start-4 shadow-sm shadow-sky-800 m-2 bg-slate-400'>
          <div className='flex justify-center'>
            <Image src={login_user} alt="login" style={ {width:"50%",height:"200px"}}/>
          </div>
          <h1 className='text-center font-bold py-2'>Login here</h1>
          <form action="" onSubmit={handleLogin}>
              <div className="mb-6">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" id="user-email" name="user-email" className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500
                      focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event)=> {
                            setData({
                                ...data,
                                email:event.target.value,
                            });
                          }}
                          value={data.email}
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
                            setData({
                                ...data,
                                password:event.target.value,
                            });
                          }}
                          value={data.password}
                        />
              </div>

              <div className='flex justify-center mb-2'>
                  <button type="submit" className='bg-blue-500  mr-3 hover:bg-blue-300 px-3 py-2 rounded-xl '>login</button>
              </div>
              </form>

              
      </div>
      
     
    </div>
  )
}

export default Login