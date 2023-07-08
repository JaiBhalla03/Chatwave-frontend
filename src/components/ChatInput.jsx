import React, { useState } from 'react';
import styled from 'styled-components';

import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
// import EmojiPicker from "emoji-picker-react";
import Picker from 'emoji-picker-react';

const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        console.log(emojiObject);
        const emoji = emojiObject.emoji;
        const message = msg + emoji;
        setMsg(message);
    };

    const sendChat = (event)=>{
        event.preventDefault();
        if(msg.length > 0){
            handleSendMsg(msg);
            setMsg('');
        }
    }


    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && (
                        <div className="emoji-picker-react">
                            <Picker onEmojiClick={handleEmojiClick} theme={'dark'} width={400} height={400} native/>
                        </div>
                    )}
                </div>
            </div>
            <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                <input
                    type="text"
                    placeholder="Type your message here"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #161b1c;
  padding: 0.2rem;

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: yellow;
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        bottom: 100%; /* Update this value to position the picker correctly */
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #273031;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4a5759;
      border: none;

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
