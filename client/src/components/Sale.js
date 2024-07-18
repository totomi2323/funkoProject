import React, { useEffect, useState } from "react";
import Card from "./subComponents/Card";
import "../styles/itemsForSale.css";
import { useParams } from "react-router-dom";
const Sale = () => {


  const [seller, setSeller] = useState(undefined)

  let { sellerId } = useParams();

  useEffect(() => {

      fetch("https://server-damp-darkness-3315.fly.dev/api/seller/" + sellerId, {
        method: "GET",
      }).then((response) => {
        response.json().then((res) => {
            setSeller(res);
        });
      });
    
  }, []);

  return <div className="wishlistPage">
    {seller ? (
            <>
                 <div className="userContactDetails">
                <p className="sellerName">{seller.nickName}</p>
                <div className="contactOptionsContainer">
                  {seller.contact.map((cont) => {
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
                {seller.sale.map((item, i) => {
                  return (
                    <Card
                      key={i}
                      item={item.item}
                      forSale={item}
                      myItems={false}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>No items for sale</>
          )}
  </div>;
};

export default Sale;
