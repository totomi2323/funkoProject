import React from "react"
import { useAuth } from "../hooks/AuthProvider"

const MyItems = () => {
    const {user} = useAuth();

    return(
        <div>
            <p>MyItems page</p>
        </div>
    )
}

export default MyItems;