import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListContext = createContext();

const ListState = (props) => {
  const navigation = useNavigate();
  const [updateInputs, setupdateInputs] = useState({
    title: "",
    task: "",
  });
  const [List, setList] = useState([]);
  const getAllList = async () => {
    const url = "http://localhost:3002/Todo/fetch";
    const GetUser = fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authtoken"),
      },
    });
    const response = await GetUser;
    const result = await response.json();
    console.log(result);
    if (!result.errors) {
      setList(result.AllTask);
      return result.username;
    } else {
      console.log(result.errors);
    }
  };
  const addList = (data) => [setList(List.concat(data))];
  const deleteList = async (list) => {
    const url = `http://localhost:3002/Todo/delete/${list._id}`;
    const del = fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authtoken"),
      },
    });
    const response = await del;
    const result = await response.json();
    if (!result.errors) {
      console.log(result.deleted._id);
      const filteredArr = List.filter(
        (list) => result.deleted._id !== list._id
      );
      console.log(filteredArr);
      setList(filteredArr);
    } else {
      console.log(result.errors);
    }
  };
  const UpdateInInputs = (list) => {
    console.log(list);
    setupdateInputs({
      _id: list._id,
      title: list.title,
      task: list.task,
    });
  };
  const UpdateList = async (inputs) => {
    const url = "http://localhost:3002/Todo/update";
    const UpdateTask = fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authtoken"),
        updateid: updateInputs._id,
      },

      body: JSON.stringify(inputs), // body data type must match "Content-Type" header
    });
    const response = await UpdateTask;
    const result = await response.json();
    console.log(result);
    if (!result.errors) {
      console.log(result);
      navigation("/");
    } else {
      console.log(result.errors);
    }
  };
  return (
    <ListContext.Provider
      value={{
        List,
        addList,
        getAllList,
        deleteList,
        updateInputs,
        UpdateInInputs,
        UpdateList,
      }}
    >
      {" "}
      {props.children}
    </ListContext.Provider>
  );
};

export { ListContext, ListState };
