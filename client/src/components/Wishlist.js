import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Card from "./subComponents/Card";
import "../styles/wishlist.css"
const Wishlist = () => {
  const { loggedIn, user, token } = useAuth();
  console.log(user);

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.31:5000/api/wishlist/" + user.uid, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      response.json().then((res) => {
        setItems(res);
      });
    });
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
                return <Card key={i} item={item} />;
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
