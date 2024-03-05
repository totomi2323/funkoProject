import React, { useEffect, useState } from "react";
import "../../styles/card.css"
import LikeButton from "./LikeButton"
import AddToCollection from "./AddToCollection";

const Card = (props) => {
  const { item} = props;


  return (
    <div className="itemCard" alt={item.alt}>
      <div className="itemImageContainer">
        {item.imgUrl !== "undefined" ? (<> <img className="itemImage" src={item.imgUrl}></img></>) : (<> No Image Available</>)}
       
      </div>
      <div className="descriptionContainer">
        <p className="itemName">{item.name}</p>
        {item.series !== "undefined" ? (
        <ul className="seriesListContainer">
          {item.series.map((ser, i) => {
            return <li key={i} className="seriesListElement"> {ser.name}</li>;
          })}
        </ul>
      ) : (
        <>No Series</>
      )}
      <div className="interactionButtons">
        <LikeButton itemId={item._id} key={item._id}/>
        <AddToCollection key={item._id}/>
      </div>
      </div>
 
    </div>
  );
};

export default Card;
