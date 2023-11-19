import React, { useState, useEffect } from "react";

import Editor from "./Editor";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [Inputs, setInputs] = useState({ title: "", summary: "" });
  const navigate = useNavigate();
  const [value, setValue] = useState(" "); // this is for the react quill only

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/post/${id}`);
      const resultjson = await response.json();
      console.log(resultjson);
      setInputs({ title: resultjson.title, summary: resultjson.summary });
      setValue(resultjson.content);
    })();
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...Inputs,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };
  const handleEditPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", Inputs.title);
    data.set("summary", Inputs.summary);
    // if (Object.keys(Inputs.file).length === 0) {
    // }
    data.set("file", Inputs.file);
    data.set("content", value);

    const response = await fetch(`http://localhost:5000/edit/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
    navigate("/post/" + id);
  };
  return (
    <form
      action="

"
      id="form"
      onSubmit={handleEditPost}
      className="createPost"
    >
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
        value={Inputs.title}
        required
      />
      <input
        type="text"
        placeholder="summary"
        name="summary"
        onChange={handleChange}
        value={Inputs.summary}
        required
      />
      <input type="file" name="file" onChange={handleChange} />
      <Editor value={value} onChange={setValue} />
      <button>edit Post</button>
    </form>
  );
};

export default EditPost;
