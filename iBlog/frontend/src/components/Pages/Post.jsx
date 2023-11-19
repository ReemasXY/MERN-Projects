import React from "react";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
const Post = ({
  _id,
  title,
  summary,
  content,
  image,
  createdAt,
  updatedAt,
  author,
}) => {
  const navigation = useNavigate();
  const handleClick = () => {
    navigation(`/post/${_id}`);
  };
  return (
    <>
      <div className="post">
        <div className="img" onClick={handleClick}>
          <img src={"http://localhost:5000/" + image} alt="" />
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2 style={{ cursor: "pointer" }}>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            <span className="time">
              {format(new Date(createdAt), "MMM d yyy hh:mm bb")}
            </span>
          </p>
          <p>{summary}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
