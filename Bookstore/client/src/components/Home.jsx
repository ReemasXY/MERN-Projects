import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

import { MdOutlineAdd } from "react-icons/md";
import SingleBook from "./SingleBook";
const Home = ({ loggedIn }) => {
  const [AllBooks, setAllBooks] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [changeBooks, setchangeBooks] = useState(false);
  const changedBooks = () => {
    let value;
    if (changeBooks) {
      value = false;
    } else {
      value = true;
    }
    console.log(value);
    setchangeBooks(value);
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_HOST + "/getbooks"
        );
        console.log(response.data.data);
        setAllBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("error occured " + error);
        setLoading(false);
      }
    })();
  }, [changeBooks]);

  return (
    <>
      <div className="container tw-my-10  ">
        {Loading && <Spinner />}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {AllBooks.map((book) => (
            // console.log(book)
            <SingleBook
              {...book}
              key={book._id}
              changeBooks={changedBooks}
              loggedIn={loggedIn}
            />
          ))}
        </div>
      </div>
      <Link
        to={loggedIn ? "/createbook" : "/authentication/login"}
        className="btn btn-sm btn-secondary tw-flex tw-items-center tw-text-5xl tw-w-fit tw-fixed tw-bottom-0 tw-right-0 tw-me-5 tw-my-4 tw-z-50  "
      >
        <MdOutlineAdd />
      </Link>
    </>
  );
};

export default Home;
