import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import axios from "axios";
import { sendMsgRoute, getAllMsgRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const containerRef = useRef();
  const [messages, setmessages] = useState([]);
  window.addEventListener("resize", (e) => {
    const container = document.getElementById("container");
    if (window.innerHeight < 400) {
      console.log("hello");
      container.classList.add("height");
    } else {
      container.classList.remove("height");
    }
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(getAllMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setmessages(data);
    })();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const { data } = await axios.post(sendMsgRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setmessages(msgs);

    socket.current.emit("send-msg", {
      to: currentChat._id,
      msg,
    });
  };
  socket.current.on("msg-received", (data) => {
    const message = [...messages];

    message.push({ fromSelf: false, message: data });

    setmessages(message);
  });
  return (
    <Container
      className={`flex flex-col h-[calc(100vh-167px)] md:h-[calc(100vh-164px)] relative bg-[#131324] lg:h-auto`}
      // className={`flex flex-col  relative bg-[#131324] lg:h-auto`}
      id="container"
    >
      <div className="chat-header  flex justify-between items-center p-4 ">
        <div className="user-details flex items-center space-x-3">
          <div
            className="img"
            dangerouslySetInnerHTML={{ __html: currentChat.AvatarImage }}
          ></div>
          <div className="username">
            <h2 className="text-white font-bold">{currentChat.username}</h2>
          </div>
        </div>
        <Logout />
      </div>
      <ChatMessages className="p-4 " messages={messages} />
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  .img svg {
    width: 60px;
    height: 60px;
  }
 
`;
export default ChatContainer;
