import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/AuthProvider"

const Wishlist = ()  => {
    const {loggedIn} = useAuth()
    console.log(loggedIn)

   return (
    <div>
        {!loggedIn ? (<Navigate to={"/"}></Navigate>) : (<>You are  logged in</>)}
    </div>
   )
}

export default Wishlist;