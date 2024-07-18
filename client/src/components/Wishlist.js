import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Card from "./subComponents/Card";
import "../styles/wishlist.css"
const Wishlist = () => {
  const { loggedIn, user, token } = useAuth();
 

  const [items, setItems] = useState([]);

  
  useEffect(() => {
    if (user)  {
      fetch("https://server-damp-darkness-3315.fly.dev/api/wishlist/" + user.uid, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        response.json().then((res) => {
          setItems(res);
        });
      });
      console.log(items)
    }
   
  }, []);

  return (
    <div className="wishlistPage">
      {!loggedIn ? (
        <Navigate to={"/"}></Navigate>
      ) : (
        <>
          {" "}
          {items ? (
            <div className="itemCardContainer">
              {" "}
              {items.map((item, i) => {
                return <Card key={i} item={item} myItems={false} />;
              })}
            </div>
          ) : (
            <>No liked items</>
          )}
        </>
      )}
    </div>
  );
};

export default Wishlist;
