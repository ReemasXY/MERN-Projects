import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";

import { IoIosClose } from "react-icons/io";
const DeleteModal = ({ bookId, onClose, changeBooks }) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = async () => {
    const response = await axios.delete(
      import.meta.env.VITE_HOST + "/book/" + bookId,
      { withCredentials: true }
    );
    if (!response.data.errors) {
      changeBooks();
      enqueueSnackbar("Deleted Successfully!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Book Deletion Failed!", {
        variant: "error",
      });
    }
    onClose();

    console.log(response.data);
  };
  return (
    <div
      className=" tw-fixed  tw-h-screen tw-w-screen tw-top-0 tw-left-0 tw-m-0 tw-bg-black tw-bg-opacity-25 tw-z-50 tw-flex tw-justify-center tw-items-center"
      onClick={onClose}
    >
      <div
        className="container  tw-rounded-md tw-p-5  tw-max-w-sm tw-bg-white tw-relative "
        onClick={(e) => e.stopPropagation()}
      >
        <button className="tw-absolute tw-right-0 tw-top-0">
          <IoIosClose
            className=" tw-text-red-400 tw-text-4xl"
            onClick={onClose}
          />
        </button>
        <h2 className="tw-text-red-500 tw-font-serif tw-text-lg  tw-italic tw-text-center tw-mb-9 ">
          Are you sure to delete this book?{" "}
        </h2>

        <div className="buttons d-flex tw-justify-center tw-items-center tw-space-x-7">
          <button
            className="  tw-bg-blue-400 tw-p-3  tw-rounded-md tw-px-5 "
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className=" tw-bg-red-400 tw-p-3  tw-rounded-md tw-px-5"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
