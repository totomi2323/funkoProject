import React, { useEffect, useState } from "react";

const Register = ()  => {
return (
    <div>
    <h1>Login/Register</h1>
    <form action="#">
        <label htmlFor="email">Email: </label>
        <input type={"text"} name="email" required ></input>
        <label htmlFor="password">Password:</label>
        <input type={"password"} name="password" required></input>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input type={"password"} name="confirmPassword" required></input>

    </form>
    </div>
)
}

export default Register;