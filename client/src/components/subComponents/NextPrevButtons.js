import { useSearchParams, Link } from "react-router-dom";
import "../../styles/prevNextButtons.css";

const NextPrevButtons = (props) => {
  const { data } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  let searchValue = searchParams.get("searchItem");

  return (
    <div className="nextPrevButtonContainer">
      {searchValue ? (
        <>
          {data.hasPrevPage ? (
            <Link
              className="nextPrevButton"
              to={
                "/?searchItem=" + searchValue + "&page=" + (data.prevPage - 1)
              }
            >
              <span>Previous page</span>
            </Link>
          ) : (
            <></>
          )}
          {data.hasNextPage ? (
            <Link
              className="nextPrevButton"
              to={
                "/?searchItem=" + searchValue + "&page=" + (data.nextPage - 1)
              }
            >
              <span>Next page</span>
            </Link>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>{data.hasPrevPage ? (
            <Link
              className="nextPrevButton"
              to={
                "/?page=" + (data.prevPage - 1)
              }
            >
              <span>Previous page</span>
            </Link>
          ) : (
            <></>
          )}
          {data.hasNextPage ? (
            <Link
              className="nextPrevButton"
              to={
                "/?page=" + (data.nextPage - 1)
              }
            >
              <span>Next page</span>
            </Link>
          ) : (
            <></>
          )}</>
      )}
    </div>
  );
};

export default NextPrevButtons;
