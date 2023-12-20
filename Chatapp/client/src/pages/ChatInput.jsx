import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [inputMessage, setinputMessage] = useState("");
  const handleEmojiChange = (emo, event) => {
    event.stopPropagation();
    let emojimsg;

    emojimsg = inputMessage + emo.emoji;
    setinputMessage(emojimsg);
  };
  const handleInputChange = (e) => {
    setinputMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.length > 0) {
      handleSendMsg(inputMessage);
      setinputMessage("");
    }
  };
  return (
    <div className="main mt-auto flex space-x-4 bg-[#080420]  items-center p-4 z-10">
      <div className="button-container flex items-center">
        <div className="emoji ">
          <BsEmojiSmile
            onClick={() => {
              setshowEmojiPicker(!showEmojiPicker); // !false= true
            }}
            className=" text-[#ffff00c8] text-2xl cursor-pointer"
          />

          {showEmojiPicker && (
            <div
              className="parent absolute h-full w-full top-0 left-0 -z-10"
              onClick={() => {
                setshowEmojiPicker(!showEmojiPicker); // !false= true
              }}
            >
              <div
                className="picker-container"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Picker
                  emojiStyle="facebook"
                  onEmojiClick={handleEmojiChange}
                />
              </div>
              {/* //onEmojiclick works like click event however first parameter is a emoji object and 2nd one is event */}
            </div>
          )}
        </div>
      </div>
      <form
        className="input-container w-full space-x-3 flex
         bg-[#ffffff34] border-0 rounded-xl  overflow-hidden"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter your text here"
          className="w-[80%] bg-[transparent] p-3 outline-none
          text-white lg:w-[90%]
          "
          onChange={handleInputChange}
          value={inputMessage}
        />
        <button className="text-xl text-white bg-[#9a86f3] p-2 w-[20%] lg:w-[10%] ">
          <IoMdSend className="mx-auto" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
