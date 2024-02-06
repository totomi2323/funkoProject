import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState } from "react";

const GoogleAuthButton = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    // Send a request to the backend to clear the session
    fetch("http://localhost:5000/google/logout", {
      method: "POST",
      mode:'cors',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const responseGoogle = (response) => {
    const {profileObj} = response;
    console.log(response)
    fetch("http://localhost:5000/auth/google", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: response.accessToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the backend response
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <GoogleLogout
            clientId="486687335318-1b64alget6tgq26obrussaktea0ke9el.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </>
      ) : (
        <>
          <GoogleLogin
            clientId="486687335318-1b64alget6tgq26obrussaktea0ke9el.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </>
      )}
    </div>
  );
};

export default GoogleAuthButton;
