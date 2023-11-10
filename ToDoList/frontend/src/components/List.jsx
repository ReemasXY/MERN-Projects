import React, { useContext, useEffect } from "react";
import { ListContext } from "../context/ListContext";

import { useNavigate } from "react-router-dom";

const List = (props) => {
  const navigation = useNavigate();
  const ListC = useContext(ListContext);
  const { List, getAllList, deleteList, UpdateInInputs } = ListC;
  useEffect(() => {
    (async () => {
      console.log("UseEffect hook in use");
      const username = await getAllList();
      console.log(username);
      props.changeUsername(username);
    })();
  }, []);

  return (
    <div className="container my-4 ">
      <div className="row row-cols-1 row-cols-md-3 g-4 align-items-stretch">
        {List.map((list) => {
          return (
            <div className="col" key={list._id}>
              <div className="card h-100 bg-dark text-white shadow1">
                <div className="card-body">
                  <h5 className="card-title">{list.title}</h5>
                  <p className="card-text">{list.task}</p>
                  <i
                    className="fa-solid fa-trash mx-3"
                    onClick={() => {
                      deleteList(list);
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      UpdateInInputs(list);
                      navigation("/update");
                    }}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}

        <div className="col" onClick={() => navigation("./addtask")}>
          <div className="card h-100 bg-dark text-white shadow1">
            <div className="card-body">
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
