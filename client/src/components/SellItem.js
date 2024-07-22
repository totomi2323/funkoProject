import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useParams } from "react-router-dom";
import "../styles/sellItem.css";
import {useNavigate} from "react-router-dom"

const SellItem = () => {
  const { user, token } = useAuth();

  
  const [item, setItem] = useState({});
  const [file, setFile] = useState();
  const [statusMessage, setStatusMessage] = useState('');

  const navigate = useNavigate();


  let { itemId } = useParams();

  useEffect(() => {
    fetch("https://server-damp-darkness-3315.fly.dev/api/item/" + itemId, {
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

    const data = {}
   console.log(user)
    data.price = e.target.elements.price.value;
    data.quantity = e.target.elements.quantity.value;
    data.description = e.target.elements.description.value;
    data.location = e.target.elements.location.value;
    
    const formData = new FormData();
    formData.append("data" ,JSON.stringify(data))
    formData.append("userID", user.uid)
    formData.append("itemID", item._id)
    formData.append("file", file)

    fetch("https://server-damp-darkness-3315.fly.dev/api/sell/add", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }) .then((response) => {
      handleResponseStatus(response.status)
    });
      
  };
  const handleResponseStatus = (status) => {
    switch (status) {
      case 200:
        setStatusMessage('Success! Your request was completed.');
        navigate("/my_items")
        break;
      case 201:
        setStatusMessage('Created! Your resource has been created.');
        break;
      case 400:
        setStatusMessage('Bad Request! Please check your input.');
        break;
      case 401:
        setStatusMessage('Unauthorized! Please log in.');
        break;
      case 403:
        setStatusMessage('Forbidden! You do not have access.');
        break;
      case 404:
        setStatusMessage('Not Found! The resource does not exist.');
        break;
      case 500:
        setStatusMessage('Server Error! Please try again later.');
        break;
      default:
        setStatusMessage('An unexpected error occurred.');
    }
  };


  return (
    <div className="centeredContainer">
      <div className="itemForSale">
        {item ? (
          <div className="itemPictureContainer" alt={item.alt} key={item._id}>
            <div className="sellItemImageContainer">
              {item.imgUrl !== "undefined" ? (
                <>
                  <img className="itemForSaleImage" alt={item.alt} src={item.imgUrl}></img>
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
          <form className="sellForm" action="#" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-element">
              <label htmlFor="description" className="descriptionLabel"> Description: </label>
              <input type={"text"} name="description" className="descriptionInput" ></input>
            </div>{" "}
            <div className="form-element">
              <label htmlFor="location" className="locationLabel"> Location: </label>
              <input type={"text"} name="location" classname="locationInput" required></input>
            </div>
           
            <div className="form-element">
              <label htmlFor="price" className="priceLabel">Price: </label>
              £ <input type={"number"} name="price" className="priceInput" required></input>
            </div>
            <div className="form-element">
              <label htmlFor="quantity" className="quantityLabel">Quantity: </label>
              <input
                type={"number"}
                name="quantity"
                required
                placeholder="1"
                className="quantityInput"
              ></input>
            </div>
            <div className="form-element">
              <label htmlFor="timestamp_img" className="timeStampImgLabel">Timestamp image: </label>
              <input type={"file"} name="timestamp_img" className="timeStampImgInput" onChange={(e) => setFile(e.target.files[0])} required></input>
            </div>
            <p>{statusMessage}</p>
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
