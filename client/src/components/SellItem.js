import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useParams } from "react-router-dom";

const SellItem = () => {
  const { user, token } = useAuth();

  const [item, setItem] = useState({});

  let { itemId } = useParams();

  useEffect(() => {
    fetch("http://192.168.0.31:5000/api/item/" + itemId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      response.json().then((res) => {
        setItem(res);
        console.log(res);
      });
    });
  }, []);

  return (
    <div>
      
      <div className="itemsForSale">
          {item ? (
            <div className="itemCard" alt={item.alt} key={item._id}>
              <div className="itemImageContainer">
                {item.imgUrl !== "undefined" ? (
                  <>
                    {" "}
                    <img className="itemImage" src={item.imgUrl}></img>
                  </>
                ) : (
                  <> No Image Available</>
                )}
              </div>
              <div className="descriptionContainer">
                <p className="itemName">{item.name}</p>
                {item.series  ? (
                  <ul className="seriesListContainer">
                    {item.series.map((ser, i) => {
                      return (
                        <li key={i} className="seriesListElement">
                          {" "}
                          {ser.name}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <>No Series</>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        
      </div>
      
    </div>
  );
};

export default SellItem;
