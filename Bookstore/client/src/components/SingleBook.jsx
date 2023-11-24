import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import axios from "axios";

const SingleBook = ({
  _id,
  title,
  author,
  createdAt,
  description,
  changeBooks,
  loggedIn,
}) => {
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [userInfo, setuserInfo] = useState({});

  const getUser = async () => {
    console.log("calling");
    const response = await axios.get(import.meta.env.VITE_HOST + "/user/info", {
      withCredentials: true,
    });

    setuserInfo(response.data);
  };
  useEffect(() => {
    if (loggedIn) {
      getUser();
    }
  }, []);

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          changeBooks={changeBooks}
          bookId={_id}
          onClose={() => {
            setshowDeleteModal(false);
          }}
        />
      )}
      <div className="col">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h2 className="tw-font-serif tw-font-semibold tw-italic tw-text-2xl tw-capitalize tw-my-4">
              {title}
            </h2>
            <h2 className="tw-font-serif  tw-italic tw-text-sm  tw-my-4 tw-text-slate-500">
              By: {author.username}
            </h2>
            <p className="card-text">{description.slice(0, 150) + "..."}</p>
          </div>
          <div className=" card-footer tw-border-none tw-bg-white tw-my-3   d-flex justify-content-between align-items-center">
            <div className=" tw-flex tw-space-x-1 ">
              <Link
                type="button"
                className="btn btn-sm btn-outline-secondary tw-text-xl"
                to={"books/details/" + _id}
              >
                <BsInfoCircle />
              </Link>
              {loggedIn && author._id === userInfo.userId && (
                <Link
                  to={"books/edit/" + _id}
                  type="button"
                  className="btn btn-sm btn-outline-secondary tw-flex tw-items-center tw-text-xl"
                >
                  <AiOutlineEdit />
                </Link>
              )}
              {loggedIn && author._id === userInfo.userId && (
                <button
                  className="btn btn-sm btn-outline-secondary tw-flex tw-items-center tw-text-xl"
                  onClick={() => {
                    setshowDeleteModal(true);
                  }}
                >
                  <MdOutlineDelete />
                </button>
              )}
            </div>
            <small className="text-muted">
              {format(new Date(createdAt), "  do MMM yyy")}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBook;
