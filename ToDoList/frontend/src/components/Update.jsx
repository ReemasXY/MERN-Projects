import React, { useContext, useState } from "react";

import { ListContext } from "../context/ListContext";
const Update = () => {
  const ListC = useContext(ListContext);
  const { updateInputs, UpdateList } = ListC;
  const [inputs, setinputs] = useState({
    title: updateInputs.title,
    task: updateInputs.task,
  });

  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.id]: e.target.value });
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          UpdateList(inputs);
        }}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={handleChange}
            required
            value={inputs.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="task" className="form-label">
            Task
          </label>
          <textarea
            className="form-control"
            id="task"
            rows="3"
            onChange={handleChange}
            required
            value={inputs.task}
          ></textarea>
        </div>

        <button className="btn btn-danger" type="submit">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default Update;
