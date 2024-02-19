import React from "react";
import { useState, useEffect } from "react";
import {
  googleLogout,
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";

const GoogleAuthButton = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
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
          <button onClick={()=> {login() ; setLoggedIn(true)}}>Login</button>
        )}
     
    </div>
  );
};

export default GoogleAuthButton;
