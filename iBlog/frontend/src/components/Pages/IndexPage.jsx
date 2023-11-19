import React, { useEffect, useState } from "react";
import Post from "./Post";

const IndexPage = () => {
  const [blogs, setposts] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/post");
      const result = await response.json();

      setposts(result);
    })();
  }, []);

  return (
    <>
      {blogs.map((post) => {
        return <Post {...post}></Post>;
      })}
    </>
  );
};

export default IndexPage;
