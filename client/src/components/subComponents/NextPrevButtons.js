import { useSearchParams, Link } from "react-router-dom";

const NextPrevButtons = (props) => {
  const { data } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  let searchValue = searchParams.get("searchItem");
  let pageValue = searchParams.get("page");

  return (
    <div>
      {data.hasPrevPage ? (
        <Link
          className="nextPrevButton"
          to={"/?searchItem=" + searchValue + "&page=" + (data.prevPage - 1)}
        >
          Previous page
        </Link>
      ) : (
        <></>
      )}
      {data.hasNextPage ? (
        <Link
          className="nextPrevButton"
          to={"/?searchItem=" + searchValue + "&page=" + (data.nextPage - 1)}
        >
          Next page
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NextPrevButtons;
