import React from "react";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const GoogleAuthButton = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState()
  function setUserToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken))
  }
  const getToken =() =>{
    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    return userToken?.token
} 
  

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      setLoggedIn(true);
      const tokens = await fetch("http://127.0.0.1:5000/googleAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      }).then((response) => response.json());
      console.log(tokens);
      
    },
    redirect_uri: "postmessage" ,
    flow: "auth-code",
  });

  return (
    <div>
      {loggedIn ? (
        <button
          onClick={() => {
            googleLogout();
            setLoggedIn(false);
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            login();
          }}
        >
          Google Login
        </button>
      )}
    </div>
  );
};

export default GoogleAuthButton;
