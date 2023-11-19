import React, { useRef } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
const CreatePost = () => {
  const navigate = useNavigate();

  const quillRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", Inputs.title);
    data.set("summary", Inputs.summary);
    data.set("file", Inputs.file);
    data.set("content", value);
    //formdata frontend ma access garna ali garo xa console.log(data) le hudaina use console.log(...data) kei nadekha pani server bhitra janxa formdata
    const response = await fetch("http://localhost:5000/create", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    const result = await response.json();
    if (!result.error) {
      navigate("/");
    } else {
      alert(result.error);
    }
  };
  const [Inputs, setInputs] = useState();
  const [value, setValue] = useState(""); // this is for the react quill only
  const handleChange = (e) => {
    setInputs({
      ...Inputs,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };
  return (
    <form
      action="

"
      id="form"
      onSubmit={handleSubmit}
      className="createPost"
    >
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="summary"
        name="summary"
        onChange={handleChange}
        required
      />
      <input type="file" name="file" onChange={handleChange} />
      <Editor value={value} onChange={setValue} />
      <button>Create Post</button>
    </form>
  );
};

export default CreatePost;
