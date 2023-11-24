import React, { useState } from "react";

import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [Inputs, setInputs] = useState();
  const handleChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_HOST+"/createbook", {
      method: "POST",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify(Inputs),
      credentials: "include",
    });
    const result = await response.json();
    if (!result.errors) {
      enqueueSnackbar("BookCreated Successfully!", {
        variant: "success",
      
      });
      navigate("/");
    } else {
      console.log(result.errors);
      enqueueSnackbar("BookCreation Failed !", { variant: "error" });
    }
  };
  return (
    <>
      <BackButton />
      <div className="container my-4 tw-w-3/5">
        <form action="" className="tw tw-space-y-4" onSubmit={handleSubmit}>
          <h2 className="tw-text-center">Create Book</h2>
          <div className="title tw-flex tw-flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="tw-border-2 tw-rounded-md tw-p-2"
              onChange={handleChange}
              minLength={5}
              required
            />
          </div>
          <div className="publishedYear tw-flex tw-flex-col">
            <label htmlFor="publishedYear">PublishedYear</label>
            <input
              type="number"
              name="publishedYear"
              className="tw-border-2 tw-rounded-md tw-p-2"
              onChange={handleChange}
              min={1500}
              required
            />
          </div>
          <div className="description tw-flex tw-flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="tw-border-2 tw-rounded-md tw-p-2 tw-h-40"
              onChange={handleChange}
              minLength={100}
              required
            ></textarea>
          </div>
          <button className="tw-bg-purple-600 tw-p-2 tw-rounded-md tw-text-white">
            Create Book
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBook;
