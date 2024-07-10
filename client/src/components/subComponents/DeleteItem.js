import React, { useEffect, useState } from "react";
import "../../styles/addToCollection.css";
import { useAuth } from "../../hooks/AuthProvider";

const DeleteItem = (props) => {
  let { token } = useAuth();

  const { forSale, myItems } = props;

  const handleSubmit = () => {
    const data = forSale;
    fetch("http://192.168.0.31:5000/api/sale/delete", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      
      {myItems ? (
        <>
          <button
            className="deleteButton"
            type="button"
            style={{ backgroundColor: "#e50000" }}
            onClick={() => {
              document.querySelector(".checkDelete").style.display = "flex";
            }}
          >
            <span className="button__text">Delete</span>
            <span className="button__icon">
              <svg
                className="svg"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title></title>
                <path
                  d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                ></path>
                <line
                  style={{
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeMiterlimit: "10",
                    strokeWidth: "32px",
                  }}
                  x1="80"
                  x2="432"
                  y1="112"
                  y2="112"
                ></line>
                <path
                  d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                ></path>
                <line
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                  x1="256"
                  x2="256"
                  y1="176"
                  y2="400"
                ></line>
                <line
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                  x1="184"
                  x2="192"
                  y1="176"
                  y2="400"
                ></line>
                <line
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                  x1="328"
                  x2="320"
                  y1="176"
                  y2="400"
                ></line>
              </svg>
            </span>
          </button>
          <div className="checkDelete">
            <p>Are you sure to delete ?</p>
            <div className="checkDeleteButtonContainer">
              <button onClick={handleSubmit}>Yes</button>
              <button
                onClick={() => {
                  document.querySelector(".checkDelete").style.display = "none";
                }}
              >
                No
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteItem;
