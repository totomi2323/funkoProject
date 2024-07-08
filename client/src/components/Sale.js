import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Card from "./subComponents/Card";
import "../styles/itemsForSale.css";
import { useParams } from "react-router-dom";
const Sale = () => {
  let { sellerId } = useParams;

  return <div className="sellerPage">
    
  </div>;
};

export default Sale;
