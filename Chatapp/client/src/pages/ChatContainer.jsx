import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatContainer = ({ currentChat }) => {
  const handleSendMsg = (msg) => {
    alert(msg);
  };
  return (
    <Container className="flex flex-col h-full relative">
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
      <ChatMessages className="p-4 " />
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
