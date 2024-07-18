import React, { useEffect, useState } from "react";
import "../../styles/card.css";
import LikeButton from "./LikeButton";
import AddToCollection from "./AddToSellButton";
import DeleteItem from "./DeleteItem";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const { item, forSale, myItems } = props;
  const navigate = useNavigate();

  item.name = item.name.replace(/&amp;/g, "&");

  return (
    <div className="itemCard" alt={item.alt} key={item._id}>
      <div className="itemImageContainer">
        {item.imgUrl !== "undefined" ? (
          <>
            {forSale ? (
              <img
                className="itemImage"
                src={"http://192.168.0.31:5000/images/" + forSale.imgUrl}
              ></img>
            ) : (
              <img className="itemImage" src={item.imgUrl}></img>
            )}
          </>
        ) : (
          <> No Image Available</>
        )}
      </div>
      <div className="descriptionContainer">
        <p className="itemName">{item.name}</p>
        {item.series !== "undefined" ? (
          <ul className="seriesListContainer">
            {item.series.map((ser, i) => {
              return (
                <li key={i} className="seriesListElement">
                  {ser.name}
                </li>
              );
            })}
          </ul>
        ) : (
          <>No Series</>
        )}
        {forSale ? (
          <div className="saleDescriptionContainer">
            <div className="saleDescription">
              <p>Item description:</p>
              <p>{forSale.description}</p>{" "}
            </div>
            <div className="salePrice">
              <p className="price">Price: £{forSale.price}</p>
              <p className="quantity">Available: {forSale.quantity} pcs</p>
            </div>
            <DeleteItem forSale={forSale} myItems={myItems}/>
          </div>
        ) : (
          <div>
            <div className="interactionButtons">
              <LikeButton itemId={item._id} />
              <AddToCollection itemId={item._id} />
            </div>
            {item.available.length !== 0 ? (
              <div className="availableContainer">
                <p className="available">Available:</p>
                <ul className="sellerList">
                  {item.available.map((value, i) => {
                    return (
                      <>
                        {value.user ? (
                          <li className="sellerListElement" key={i}>
                            <button
                              className="linkToSeller"
                              onClick={() => {
                                navigate("/seller/" + value.user._id);
                              }}
                            >
                              {value.user.nickName}
                            </button>
                            <p className="priceOfSale">£{value.price}</p>{" "}
                          </li>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
