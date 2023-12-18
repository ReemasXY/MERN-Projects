import React, { useEffect, useRef } from "react";
import styled from "styled-components";
const ChatMessages = ({ messages }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    console.log(scrollRef.current);
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <ChatContainer className="chatmessages-container">
      {messages.map((msg, index) => {
        return (
          <div
            className={`${
              msg.fromSelf ? "chat sender" : " chat receiver"
            }  w-auto`}
            key={index}
            ref={scrollRef}
          >
            <p className="max-w-[200px] md:max-w-[300px] lg:max-w-[400px] p-3 text-white  border-0 rounded-lg w-fit break-words">
              {msg.message}
            </p>
          </div>
        );
      })}
    </ChatContainer>
  );
};
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 10px;
    }
  }
  .chat {
    display: flex;
  }
  .sender {
    justify-content: end;
    p {
      background-color: #4f04ff21;
    }
  }
  .receiver {
    justify-content: flex-start;
    p {
      background-color: #9900ff20;
    }
  }
`;
export default ChatMessages;
