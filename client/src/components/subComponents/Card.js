import React, { useEffect, useState } from "react";
import "../../styles/card.css"

const Card = (props) => {
  const { item } = props;

  return (
    <div className="itemCard" alt={item.alt}>
      <div className="itemImageContainer">
        <img className="itemImage" src={item.imgUrl}></img>
      </div>
      <p className="itemName">{item.name}</p>
      {item.series !== "undefined" ? (
        <ul className="seriesListContainer">
          {item.series.map((ser, i) => {
            return <li className="seriesListElement"> {ser.name}</li>;
          })}
        </ul>
      ) : (
        <>No Series</>
      )}
    </div>
  );
};

export default Card;
