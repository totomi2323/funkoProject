import React, { useEffect, useState } from "react";
import GoogleAuthButton from "./GoogleAuthButton";
import "../styles/login.css";
import { useAuth } from "../hooks/AuthProvider";


const Login = () => {
  let { user, loggedIn, checkLoggedIn} = useAuth();



  useEffect(() => {
    if (user === undefined && loggedIn === false) {
      checkLoggedIn()
    }
  }, [])

  return (
    <div className="login-container">
      <h1 className="loginHeader">Login/Register</h1>
      <form className="form-container" action="#">
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type={"text"} name="email" required className="email" disabled></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type={"password"} name="password" required className="password" disabled></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <GoogleAuthButton />
     {/* <div className="register-link">
        <Link to="/register">Create account</Link>
      </div>
     
    <div>
        <button className="btn btn-facebook">Facebook login</button>
  </div>*/ }
    </div>
  );
};

export default Login;
