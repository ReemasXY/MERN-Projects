import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, sockethost } from "../utils/APIRoutes";
import Contact from "./Contact";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();

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
    if (currentUser) {
      socket.current = io(sockethost);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(
            allUsersRoute + "/" + currentUser._id
          );

          setallUsers(data);
        } else {
          navigate("/setAvatar");
        }
      }
    })();
  }, [currentUser]);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen bg-[#131324] ">
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
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
