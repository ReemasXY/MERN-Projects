import React, { useState, useEffect } from "react";

import BackButton from "./BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import { useSnackbar } from "notistack";

const Editbook = () => {
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const host = import.meta.env.VITE_HOST;
  const [Loading, setLoading] = useState(true);
  const [Inputs, setInputs] = useState({
    title: "",
    description: "",
    publishedYear: "",
  });
  const { id } = useParams();
  const handleChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = axios.put(host + "/book/" + id, Inputs, {
      withCredentials: true,
    });
    const result = (await response).data;
    if (!result.errors) {
      enqueueSnackbar("BookUpdated Successfully!", {
        variant: "success",
      });
      navigation("/");
    } else {
      navigation("/");
      enqueueSnackbar("Updating Failed!", {
        variant: "error",
      });
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(host + "/book/" + id);
        const result = response.data;
        setInputs({
          title: result.title,
          description: result.description,
          publishedYear: result.publishedYear,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <BackButton />
      <div className="container my-4 tw-w-3/5">
        {Loading && <Spinner />}
        {!Loading && (
          <form action="" className="tw tw-space-y-4" onSubmit={handleSubmit}>
            <h2 className="tw-text-center">Edit Book</h2>
            <div className="title tw-flex tw-flex-col">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                className="tw-border-2 tw-rounded-md tw-p-2"
                onChange={handleChange}
                value={Inputs.title}
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
                value={Inputs.publishedYear}
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
                value={Inputs.description}
                required
              ></textarea>
            </div>
            <button className="tw-bg-purple-600 tw-p-2 tw-rounded-md tw-text-white">
              Edit Book
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Editbook;
