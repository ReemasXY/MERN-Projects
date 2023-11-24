import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
const BackButton = ({ destination = "/" }) => {
  // this is the default value of destination if not passed anything
  return (
    <Link
      to={destination}
      className="tw-w-fit tw-mx-2 tw-my-2 tw-flex tw-fixed"
    >
      <IoIosArrowBack className="tw-text-5xl " />
    </Link>
  );
};

export default BackButton;
