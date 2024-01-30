import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"
const handleSubmit = async (e) => {
    console.log("Search")
}

const NavBar = ()  => {
return (
    <div className="navbar">
        <p>Logo</p>
        <Link className="homeLink" to={"/"}>Home</Link>
        <form action={"#"} className="searchForm" onSubmit={handleSubmit}>
            <label className="searchItemLabel" htmlFor="searchItem"></label>
            <input className="searchItemInput" type={"text"} name="searchItem" placeholder="Spider-man" required></input>
            <button className="searchButton" type="submit">Search</button>
        </form>
        <Link className="loginLink" to={"/login"}> Login</Link>
        <Link className="wishListLink" to={"/wishlist"}> Wishlist</Link>
    </div>
)
}

export default NavBar;