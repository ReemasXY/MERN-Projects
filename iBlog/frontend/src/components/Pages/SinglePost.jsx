import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";

const SinglePost = () => {
  const { id } = useParams(); // gives the params like req.params
  const [result, setresult] = useState(null);
  const { username } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/post/${id}`);
      const resultjson = await response.json();
      console.log(resultjson);
      setresult(resultjson);
    })();
  }, []);
  const handleClick = () => {
    console.log(result);

    navigate(`/edit/${result._id}`);
  };
  return (
    <>
      {result && (
        <div className="postpage">
          <h1 className="title">{result.title}</h1>
          <div className="sinfo">
            <span className="time">
              {format(new Date(result.createdAt), "MMM d yyy hh:mm bb")}
            </span>
            <span className="author">By:{result.author.username}</span>
          </div>
          {username === result.author.username && (
            <div className="edit">
              <button onClick={handleClick}>Edit Post</button>
            </div>
          )}
          <div
            className="img"
            style={{ display: "flex", maxHeight: "300px", overflow: "hidden" }}
          >
            <img
              src={"http://localhost:5000/" + result.image}
              alt=""
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                width: "100%",
              }}
            />
          </div>

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: result.content }}
          ></div>
        </div>
      )}
    </>
  );
};
export default SinglePost;
