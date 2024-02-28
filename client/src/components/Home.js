import React, { useEffect, useState } from "react";
import Card from "./subComponents/Card";
import NextPrevButtons from "./subComponents/NextPrevButtons";
import "../styles/card.css";
import "../styles/home.css"

import { useSearchParams, Link } from "react-router-dom";

const Home = () => {
  const [fetchedData, setFetchedData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  let searchValue = searchParams.get("searchItem");
  let pageValue = searchParams.get("page");

  useEffect(() => {
    fetch(
      "http://192.168.0.31:5000/api/home?" +
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
        <div className={"homePage"}>
          <form action={"/"} className="searchForm">
            <label className="searchItemLabel" htmlFor="searchItem"></label>
            <input
              className="searchItemInput"
              type={"text"}
              name="searchItem"
              placeholder="Spider-man"
              required
            ></input>
            <button className="searchButton" type="submit">
              Search
            </button>
          </form>
          <div className="itemCardContainer">
            {fetchedData.data.docs.map((item, i) => {
              return <Card key={i} item={item} />;
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
