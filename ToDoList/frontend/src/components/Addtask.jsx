import React, { useState, useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { ListContext } from "../context/ListContext";
import { useNavigate } from "react-router-dom";

const Addtask = () => {
  const [inputs, setinputs] = useState({});
  const navigation = useNavigate();
  const Toast = useContext(ToastContext);
  const { showToast } = Toast;
  const List = useContext(ListContext);
  const { addList } = List;
  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("runnin fetch");
    const url = "http://localhost:3002/Todo/createTask";
    const GetUser = fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authtoken"),
      },

      body: JSON.stringify(inputs), // body data type must match "Content-Type" header
    });
    const response = await GetUser;
    const result = await response.json();
    console.log(result);
    if (result.userId) {
      showToast("success", "Task added  Successfully");
      addList(result);
      navigation("/");
    } else {
      console.log(result.errors);
      showToast("danger", result.errors);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
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
            ></textarea>
          </div>

          <button className="btn btn-danger" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};

export default Addtask;
