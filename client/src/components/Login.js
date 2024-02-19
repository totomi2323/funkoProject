import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton";

const Login = () => {
  return (
    <div>
      <h1>Login/Register</h1>
      <form action="#">
        <label htmlFor="email">Email: </label>
        <input type={"text"} name="email" required></input>
        <label htmlFor="password">Password:</label>
        <input type={"password"} name="password" required></input>
      </form>
      <Link to="/register">Create account</Link>

      <GoogleAuthButton />
    </div>
  );
};

export default Login;
