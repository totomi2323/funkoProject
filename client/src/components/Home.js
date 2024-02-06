import React, { useEffect, useState } from "react";
import Card from "./subComponents/Card"
import "../styles/card.css"
import { useSearchParams, Link } from "react-router-dom";

const Home = () => {
  const [fetchedData, setFetchedData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  let searchValue = searchParams.get("searchItem")
  let pageValue = searchParams.get("page")

  useEffect(() => {
    fetch("http://localhost:5000/api/home?" + new URLSearchParams({search: searchValue ? searchValue : "" , page: pageValue ? pageValue : ""})).then((response) => {
      response.json().then((data) => {
        setFetchedData(data);
      });
    });
  }, [searchParams]);

  return (
    <>
      <button
        onClick={() => {
          console.log(console.log(fetchedData));
        }}
      >
        Console
      </button>
      {typeof fetchedData.data !== "undefined" ? (
        <div className="itemCardContainer">
          {fetchedData.data.docs.map((item, i) => {
            return <Card key={i} item={item}/>;
          })}
            <Link to={"/?searchItem="+searchValue+"&page="+fetchedData.data.nextPage}>Next</Link>
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default Home;
