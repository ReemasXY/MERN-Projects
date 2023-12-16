import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contact from "./Contact";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  const [allUsers, setallUsers] = useState([]);
  const [currentUser, setcurrentUser] = useState();
  const [currentChat, setcurrentChat] = useState();

  const navigate = useNavigate();
  const handleChat = (chat) => {
    setcurrentChat(chat);
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setcurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(
            allUsersRoute + "/" + currentUser._id
          );
          console.log(data);
          setallUsers(data);
        } else {
          navigate("/setAvatar");
        }
      }
    })();
  }, [currentUser]);
  useEffect(() => {
    console.log(currentChat);
  }, [currentChat]);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen bg-[#131324]">
        {currentUser && (
          <>
            <Contact
              allUsers={allUsers}
              currentUser={currentUser}
              changeChat={handleChat}
            ></Contact>
            {!currentChat ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer currentChat={currentChat} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
