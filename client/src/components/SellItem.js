import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/AuthProvider"
import { useParams } from "react-router-dom";

const SellItem = () => {
    const {user, token} = useAuth();

    const [item, setItem] = useState({})

    let {itemId} = useParams();

    useEffect(() => {
        fetch("http://192.168.0.31:5000/api/item/"+itemId, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }).then((response) => {
            response.json().then((res) => {
                setItem(res);
                console.log(res)
            });
          });
    }, [])

    return(
        <div>
            <p>SellItem page</p>
            <p>{itemId}</p>
        </div>
    )
}

export default SellItem;