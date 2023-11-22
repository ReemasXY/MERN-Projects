import React, { useState } from "react";
import { json } from "react-router-dom";

const CreateBook = () => {
  const [Inputs, setInputs] = useState();
  const handleChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3002/createbook", {
      method: "POST",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify(Inputs),
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
  };
  return (
    <div className="container my-4 tw-w-3/5">
      <form action="" className="tw tw-space-y-4" onSubmit={handleSubmit}>
        <div className="title tw-flex tw-flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="tw-border-2 tw-rounded-md tw-p-2"
            onChange={handleChange}
            required
            min={5}
          />
        </div>
        <div className="publishedYear tw-flex tw-flex-col">
          <label htmlFor="publishedYear">PublishedYear</label>
          <input
            type="text"
            name="publishedYear"
            className="tw-border-2 tw-rounded-md tw-p-2"
            onChange={handleChange}
            required
          />
        </div>
        <button className="tw-bg-purple-600 tw-p-2 tw-rounded-md tw-text-white">
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
