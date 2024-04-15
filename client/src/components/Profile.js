import React from "react"
import { useAuth } from "../hooks/AuthProvider"

const Profile = () => {
    const {user} = useAuth();

    return(
        <div>
            <p>Profile page</p>
        </div>
    )
}

export default Profile;