import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setAvatarRoute } from "../utils/APIRoutes";
import axios from "axios";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com";
  const [avatars, setavatars] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState();
  const navigate = useNavigate();
  const confirmAvatar = async () => {
    if (!selectedAvatar) {
      toast.error("Please select the avatar");
    }
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    const { data } = await axios.post(setAvatarRoute, {
      userId: user._id,
      image: avatars[selectedAvatar],
    });
    if (data.errors) {
      toast.error("Error setting avatar");
    } else {
      console.log(data);
      localStorage.setItem("chat-app-user", JSON.stringify(data));
      navigate("/");
    }
  };
  useEffect(() => {
    (async () => {
      const images = [];
      for (let i = 0; i < 4; i++) {
        console.log(i);
        const { data } = await axios.get(
          api + "/" + Math.round(Math.random() * 1000)
        );
        console.log(data);
        // const buffer = new Buffer(data);

        images.push(data);
      }
      setloading(false);
      setavatars(images);
    })();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/register");
    }
  }, []);
  return (
    <>
      {loading ? (
        <div className=" h-screen flex items-center">
          <img src={Loader} alt="" className="h-full" />
        </div>
      ) : (
        <div
          className="main flex flex-col items-center justify-center h-screen
      space-y-4 bg-[#131324;] p-10"
        >
          <div className="title-container">
            <h1 className="text-2xl  font-semibold text-center text-white">
              Pick your profile picture
            </h1>
          </div>
          <AvatarContainer className="flex flex-col space-y-4 sm:flex-row sm:space-x-7 sm:space-y-0">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={
                    selectedAvatar === index ? "avatar selected" : "avatar"
                  }
                  dangerouslySetInnerHTML={{ __html: avatar }}
                  onClick={() => {
                    setselectedAvatar(index);
                  }}
                />
              ); // basically changes string into html code
              // arko bhasa ma bhannu parda  inner html ho
            })}
          </AvatarContainer>
          <button
            style={{
              padding: " 15px 20px",
              borderRadius: " 5px",
              outline: " none",
              background: " transparent",
              border: " 1px solid #4e0eff",
              color: " white",
              margin: "40px",
            }}
            className="hover:!bg-[#4e0eff]"
            onClick={() => {
              confirmAvatar();
            }}
          >
            Set as Profile
          </button>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        draggable={true}
        theme="dark"
        pauseOnHover={true}
      />
    </>
  );
};
const AvatarContainer = styled.div`
  .avatar {
    height: 110px;
    width: 110px;
    padding: 7px;
    border: 0.4rem solid transparent;
    border-radius: 50%;

    transition: 0.5s ease-in-out;
  }
  .svg {
    height: 100%;
    width: 100%;
  }
  .selected {
    border: 0.4rem solid #4e0eff;
    border-radius: 50%;
  }
  @media screen and (max-width: 640px) {
    .avatar {
      height: 90px;
      width: 90px;
      border: 0.3rem solid transparent;
    }
    .selected {
      border: 0.3rem solid #4e0eff;
    }
  }
`;
export default SetAvatar;
