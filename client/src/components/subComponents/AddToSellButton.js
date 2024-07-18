import React from "react";
import "../../styles/addToCollection.css";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddToCollection = (props) => {
  const { itemId } = props;
  let { user, token } = useAuth();

  const navigate = useNavigate();
  const handleAddToSale = (e) => {
    if (!user) {
      navigate("/login");
    } else {
      console.log("sell item page")
     navigate("/sell/"+itemId)
    }
  };
  return (
    <button
      onClick={handleAddToSale}
      title="Add for sale"
      className="group cursor-pointer outline-none  duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0 0 24 24"
        className="stroke-orange-400 fill-none hover:rotate-90 group-hover:fill-orange-800 group-active:stroke-orange-200 group-active:fill-orange-600 group-active:duration-0 duration-300"
      >
        <path
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          strokeWidth="1.5"
        ></path>
        <path d="M8 12H16" strokeWidth="1.5"></path>
        <path d="M12 16V8" strokeWidth="1.5"></path>
      </svg>
    </button>
  );
};

export default AddToCollection;
