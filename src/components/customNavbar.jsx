"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Link from 'next/link';  
import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

function CustomNavbar() {
  const context = useContext(UserContext);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    // console.log("testing");
  }, []);

  async function doLogout(){
    try {
      const result = await logout();
      console.log(result);
      context.setUser(null);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout error");
      
    }
  }

  return (
    <nav className="bg-blue-600 px-4 py-3 h-16 flex justify-between items-center">
      {/* Brand Section */}
      <div className="brand text-white">
        <h1 className="text-2xl">
          <a href="/">WorkManager</a>
        </h1>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden text-white" onClick={toggleMenu}>
        <button className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ul className="flex space-x-4 text-white">
            {context.user ? (
              <>
                  <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/add-task">Add Task</Link>
                    </li>
                    <li>
                      <Link href="/show-tasks">Show Task</Link>
                    </li>
              </>
            ):(null)}

                    
                    
                    
            
        </ul>
      </div>

      {/* Desktop Login/Signup */}
      <div className="hidden md:flex">
        <ul className="flex space-x-4 text-white">
                    
            {context.user ? (
                    <>
                      <li>
                      <Link href="#!">{context.user.name}</Link>
                      </li>
                      <li>
                        <button onClick={doLogout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                        <li>
                        <Link href="/log-in">Login</Link>
                        </li>
                        <li>
                          <Link href="/signup">SignUp</Link>
                        </li>
                    </>
                  )}
        
                 
        </ul>
      </div>

      {/* Mobile Menu
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden absolute top-16 left-0 w-full bg-blue-600 p-4`}>

        <ul className="flex flex-col space-y-4 text-white">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/add-task">Add Task</Link>
          </li>
          <li>
            <Link href="/show-tasks">Show Task</Link>
          </li>
          <li>
            <Link href="/log-in">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      </div> */}
    </nav>
  );
}

export default CustomNavbar;