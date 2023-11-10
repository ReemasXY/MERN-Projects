import React from "react";

const Post = () => {
  return (
    <>
      <div className="post">
        <div className="img">
          <img
            src="https://i.pinimg.com/564x/13/3b/0a/133b0ab0142b8faf0e11ad289ff0749e.jpg"
            alt=""
          />
        </div>
        <div className="texts">
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum nam
            voluptas laboriosam?
          </h2>
          <p className="info">
            <a className="author">Sameer Maharjan</a>
            <span className="time">2023/11/09</span>
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
            in provident similique expedita alias a nihil ducimus mollitia magni
            beatae, neque nostrum inventore odit ut quas iusto, at debitis
            dolorem harum quaerat? Error, beatae fuga? Expedita voluptatem a
            eveniet facere cumque distinctio facilis rem provident tempora,
            tenetur nisi, quisquam sed!
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;
