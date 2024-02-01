import React, { useEffect, useState } from "react";
import Card from "./subComponents/Card"
import "../styles/card.css"

const Home = () => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/home").then((response) => {
      response.json().then((data) => {
        setFetchedData(data);
      });
    });
  }, []);

  return (
    <>
      <button
        onClick={() => {
          console.log(fetchedData);
        }}
      >
        Console
      </button>
      {typeof fetchedData.data !== "undefined" ? (
        <div className="itemCardContainer">
          {fetchedData.data.docs.map((item, i) => {
            console.log(item)
            return <><Card item={item}/></>;
          })}
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default Home;
