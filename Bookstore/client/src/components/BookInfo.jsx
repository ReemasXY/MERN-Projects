import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import Backbutton from "./BackButton";
import { format } from "date-fns";
const BookInfo = () => {
  const { id } = useParams();
  const [bookInfo, setbookInfo] = useState(null);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_HOST + "/book/" + id
        );
        console.log(response.data);
        setLoading(false);
        setbookInfo(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Backbutton />
      {Loading && <Spinner />}
      {bookInfo && (
        <div className="container tw-my-4">
          <h1 className="tw-text-3xl tw-italic tw-font-semibold tw-capitalize tw-text-center">
            {bookInfo.title}
          </h1>
          <div className="authoryear tw-mt-9 tw-space-y-3 tw-text-md">
            <h3 className="tw-text-slate-400 tw-italic">
              By: {bookInfo.author.username}
            </h3>
            <h3 className=" tw-italic tw-text-sm tw-font-semibold">
              PublishedYear: {bookInfo.publishedYear}
            </h3>
          </div>
          <h4 className="tw-space-x-1 tw-mt-5">
            <span className=" tw-font-semibold tw-italic">Last Upadated: </span>
            <span className=" tw-font-semibold tw-italic">
              {format(new Date(bookInfo.updatedAt), " do MMM yyy h:mm a")}
            </span>
          </h4>
          <div className="description tw-text-justify tw-mt-5 tw-italic tw-font-serif tw-break-all">
            {bookInfo.description}
          </div>
        </div>
      )}
    </>
  );
};

export default BookInfo;
