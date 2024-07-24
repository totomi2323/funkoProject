import React, { useEffect, useState } from "react";
import Card from "./subComponents/Card";
import NextPrevButtons from "./subComponents/NextPrevButtons";
import "../styles/card.css";
import "../styles/home.css";
import { useAuth } from "../hooks/AuthProvider";
import { useSearchParams, useNavigate } from "react-router-dom";
import headerPicture from "../pictures/headPics.jpg";
import searchButtonSvg from "../svg/magnify.svg";

const Home = () => {
  let { user, loggedIn, checkLoggedIn} = useAuth();

  const [fetchedData, setFetchedData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  let searchValue = searchParams.get("searchItem");
  let pageValue = searchParams.get("page");
  const navigate = useNavigate();


  useEffect(() => {
    if (user === undefined && loggedIn === false) {
      checkLoggedIn()
    }
  }, [])

  useEffect(() => {
    setSearch("");
    fetch(
      "https://server-damp-darkness-3315.fly.dev/api/home?" +
        new URLSearchParams({
          search: searchValue ? searchValue : "",
          page: pageValue ? pageValue : "",
        })
    ).then((response) => {
      response.json().then((data) => {
        setFetchedData(data);
      });
    });
  }, [searchParams]);

  return (
    <>
      {typeof fetchedData.data !== "undefined" ? (
        <div className="homePage">
          {searchValue ? (
            <></>
          ) : (
            <img src={headerPicture} className="headerPicture" alt="Page header picture"></img>
          )}

          <form className="searchForm">
            <label className="searchItemLabel" htmlFor="searchItem"></label>
            <input
              className="searchItemInput"
              type={"text"}
              name="searchItem"
              placeholder="Search..."
              required
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <button
              className="searchButton"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/?searchItem=${search}`);
              }}
            >
              <img src={searchButtonSvg} className="searchSvg" alt="Search Button"></img>
            </button>
          </form>

          <div className="itemCardContainer">
            {fetchedData.data.docs.map((item, i) => {
              return <Card key={i} item={item} myItems={false} />;
            })}
          </div>
          <NextPrevButtons data={fetchedData.data} />
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default Home;
