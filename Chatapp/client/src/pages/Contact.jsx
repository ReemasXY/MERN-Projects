import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
const Contact = ({ allUsers, currentUser, changeChat }) => {
  const [currentUserName, setcurrentUserName] = useState(currentUser.username);
  const [currentUserImage, setcurrentUserImage] = useState(
    currentUser.AvatarImage
  );
  console.log(currentUserName);
  const [currentSelected, setcurrentSelected] = useState();
  const handleChat = (index, contact) => {
    setcurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <Container className="lg:h-full">
        <div className="nav flex p-4 space-x-3 overflow-hidden bg-[#080420] items-center lg:flex-col lg:w-fit lg:h-full lg:items-start lg:space-x-0 lg:space-y-4 relative">
          <div className="brand flex items-center">
            <img src={logo} alt="" className="h-[4rem] w-[4rem] max-w-none" />
            <h3 className="text-white text-xl font-bold hidden lg:block">
              Chat Ninja
            </h3>
          </div>

          <div className="contacts flex  overflow-auto space-x-5 p-2 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-6 lg:p-0 w-[79%] lg:min-w-[300px] lg:w-fit ">
            {allUsers.map((user, index) => {
              return (
                <div
                  className={`${
                    index === currentSelected ? "selected " : "contact "
                  }flex flex-col items-center space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0 lg:bg-[#ffffff39] lg:w-full lg:py-2 lg:px-3 cursor-pointer p-3`}
                  key={index}
                  onClick={() => {
                    handleChat(index, user);
                  }}
                >
                  <div
                    className="img"
                    dangerouslySetInnerHTML={{ __html: user.AvatarImage }}
                  ></div>
                  <h1 className="text-white">{user.username}</h1>
                </div>
              );
            })}
          </div>
          <div className="currentUser static md:absolute md:right-3 lg:static flex flex-col items-center space-y-2 text-white lg:w-full lg:!mt-auto lg:flex-row lg:py-3 lg: space-x-3 uppercase justify-center ">
            <div
              className="img"
              dangerouslySetInnerHTML={{ __html: currentUserImage }}
            ></div>
            <h1>{currentUserName}</h1>
          </div>
        </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  svg {
    height: 60px;
    width: 60px;
  }
  .contacts {
    padding-right: 1.5rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      height: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 10px;
      }
    }
  }
  .contact {
    transition: 0.5s ease-in-out;
  }
  .selected {
    background-color: #9186f3;
  }
`;
export default Contact;
