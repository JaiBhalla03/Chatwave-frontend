import React, {useEffect, useState, useRef} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {allUserRoutes, host} from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client';

const Chat = () => {
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        const getCurrentUser = async() =>{
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login");
            }
            else{
                setCurrentUser(
                    await JSON.parse(localStorage.getItem("chat-app-user"))
                )
                setIsLoaded(true);
            }
        }
        getCurrentUser();
    }, [])
    useEffect(()=>{
        if(currentUser){
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])
    useEffect(()=>{
        const fetchContacts = async()=>{
            if(currentUser){
                if(currentUser.isAvatarImageSet){
                    const data = await axios.get(`${allUserRoutes}/${currentUser._id}`);
                    setContacts(data.data);
                }
                else{
                    navigate("/setavatar");
                }
            }
        }
        fetchContacts()
    }, [currentUser]);
    const handleChatChange = (chat)=>{
        setCurrentChat(chat);
    }
    console.log({currentChat, currentUser})
    return (
        <Container>
            <div className={'container'}>
                <Contacts contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange} />
                {
                    isLoaded && currentChat === undefined ?( <Welcome currentUser={currentUser}/> ) :
                        (
                        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                    )
                }
            </div>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #0a0e0f;
  .container{
    height: 85vh;
    width: 85vw;
    background-color: #161b1c;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;