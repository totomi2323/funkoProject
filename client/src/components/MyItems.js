import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Card from "./subComponents/Card";
import "../styles/wishlist.css";

const MyItems = () => {
  const { loggedIn, user, token, checkLoggedIn} = useAuth();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user === undefined && loggedIn === false) {
      checkLoggedIn()
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetch("http://192.168.0.31:5000/api/sale/" + user.uid, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        response.json().then((res) => {
          setItems(res);
        });
      });
    }
  
  }, []);

  return (
    <div className="wishlistPage">
      {!loggedIn ? (
        <Navigate to={"/"}></Navigate>
      ) : (
        <>
          {items ? (
            <>
            <div className= "userContactDetails"> User contact here</div>
              <div className="itemCardContainer">
                {items.map((item, i) => {
                  return (
                    <Card
                      key={i}
                      item={item.item}
                      forSale={item}
                      myItems={true}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>No items for sale</>
          )}
          <button onClick={() => console.log(user)}>asd</button>
        </>
      )}
    </div>
  );
};

export default MyItems;
