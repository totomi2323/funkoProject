import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState , useEffect} from "react";

const GoogleAuthButton = () => {

  function navigate(url) {
    window.location.href = url
  }
  async function auth() {
    const response = await fetch('http://127.0.0.1:5000/request',
    {method:'post'});
    const data = await response.json();
    console.log(data)
    navigate(data.url)
  }
 
  return ( 
    <div>
      <p>Google login button</p>
      <button type="button" onClick={() => auth()}>
        Google login button
      </button>
    </div>
  );
};

export default GoogleAuthButton;
