"use client";
import { currentUser } from "@/services/userService";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "./userContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // default user is null

  useEffect(() => {
    async function load() {
      try {
        const loggedUser = await currentUser();  // Assume `currentUser` gets the user data
        console.log("loggedUser_userProvider ---->", loggedUser);
        setUser({...loggedUser});  // Set user object when fetched
      } catch (error) {
        console.log("userProvider--->",error);
        // toast.error("Error in loading user");
        setUser(null);
      }
    }
    load();
  }, []);

  return <UserContext.Provider value={{user,setUser}}> {children} </UserContext.Provider>
};

export default UserProvider;
