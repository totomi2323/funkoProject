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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    const timestamp_img = e.target.elements.timestamp_img.value;
    const price = e.target.elements.price.value;
    const quantity = e.target.elements.quantity.value;
    const contact = e.target.elements.contact.value;
    const description = e.target.elements.description.value;
    const location = e.target.elements.location.value;

    fetch("http://192.168.0.31:5000/api/sell/add", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        timestamp_img,
        price,
        quantity,
        contact,
        user,
        item,
        description,
        location
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        //console.log(data);
      });
  };

  return (
    <div className="centeredContainer">
      <div className="itemForSale">
        {item ? (
          <div className="itemPictureContainer" alt={item.alt} key={item._id}>
            <div className="sellItemImageContainer">
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
          <form className="sellForm" action="#" onSubmit={handleSubmit}>
          <div className="form-element">
              <label htmlFor="description"> Description: </label>
              <input type={"text"} name="description" ></input>
            </div>{" "}
            <div className="form-element">
              <label htmlFor="location"> Location: </label>
              <input type={"text"} name="location" required></input>
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
              <label htmlFor="contact"> Contact: </label>
              <input type={"text"} name="contact" required></input>
            </div>
            <div className="form-element">
              <label htmlFor="timestamp_img">Timestamp image: </label>
              <input type={"file"} name="timestamp_img" required></input>
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
