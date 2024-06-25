import React from "react"
import { useAuth } from "../hooks/AuthProvider"

const Profile = () => {
    const {user} = useAuth();

    return(
        <div className="userPage">
            
            <p>Profile page</p>
            <button onClick={()=> {console.log(user)}}>Console</button>
        </div>
    )
}

export default Profile;