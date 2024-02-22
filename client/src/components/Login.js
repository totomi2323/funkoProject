import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h1>Login/Register</h1>
      <form className="form-container" action="#">
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type={"text"} name="email" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type={"password"} name="password" required></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="register-link">
        <Link to="/register">Create account</Link>
      </div>

      <GoogleAuthButton />
      <div>
        <button className="btn btn-facebook">Facebook login</button>
      </div>
    </div>
  );
};

export default Login;
