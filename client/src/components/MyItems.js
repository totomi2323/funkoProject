import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Card from "./subComponents/Card";
import "../styles/itemsForSale.css"


const MyItems = () => {
  const { loggedIn, user, token, checkLoggedIn } = useAuth();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user === undefined && loggedIn === false) {
      checkLoggedIn();
    }
  }, []);

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
       <button onClick={() => {console.log(items)}}>console</button>
            <button onClick={() => {console.log(user)}}>console</button>
      {!loggedIn ? (
        <Navigate to={"/"}></Navigate>
      ) : (
        <>
          {items ? (
            <>
              <div className="userContactDetails">
                <p className="sellerName">{user.nickName}</p>
                <div className="contactOptionsContainer">
                  {user.contact.map((cont) => {
                    switch (cont.name) {
                      case "Facebook":
                        return (
                          <a
                            className="facebookLink"
                            href={cont.details}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Facebook
                          </a>
                        );
                      case "Whatsapp":
                        return (
                          <p className="userContactOption">
                            WhatsApp : {cont.details}
                          </p>
                        );
                      case "Email":
                        return (
                          <p className="userContactOption">
                            Email: {cont.details}
                          </p>
                        );
                      case "Ebay":
                        return (
                          <p className="userContactOption">
                            Ebay : {cont.details}
                          </p>
                        );
                      case "Instagram":
                        return (
                          <a
                            className="instagramLink"
                            href={cont.details}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Instagram
                          </a>
                        );
                      case "other":
                        return <p className="userContactOption">Other : {cont.details}</p>;
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
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
        </>
      )}
    </div>
  );
};

export default MyItems;
