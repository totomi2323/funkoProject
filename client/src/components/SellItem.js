import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useParams } from "react-router-dom";
import "../styles/sellItem.css";
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
    <div className="centeredContainer">
      <div className="itemForSale">
        {item ? (
          <div className="itemPictureContainer" alt={item.alt} key={item._id}>
            <div className="itemImageContainer">
              {item.imgUrl !== "undefined" ? (
                <>
                  <img className="itemForSaleImage" src={item.imgUrl}></img>
                </>
              ) : (
                <p className="noImage">No Image Available</p>
              )}
            </div>
            <div className="descriptionContainer">
              <p className="itemName">{item.name}</p>
              {item.series ? (
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
        <div className="formContainer">
          <h3>Item details</h3>
          <form className="sellForm" action="#">
            <div className="form-element">
              <label htmlFor="timestamp_img">Timestamp image: </label>
              <input type={"file"} name="timestamp_img" required></input>
            </div>
            <div className="form-element">
              <label htmlFor="price">Price: </label>
              <input type={"number"} name="price" required></input>
            </div>
            <div className="form-element">
              <label htmlFor="quantity">Quantity: </label>
              <input
                type={"number"}
                name="quantity"
                required
                placeholder="1"
              ></input>
            </div>
            <div className="form-element">
              <label htmlFor="contact"> Contant: </label>
              <input type={"text"} name="contact" required></input>
            </div>
            <button type="submit" className="sell-button">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellItem;
