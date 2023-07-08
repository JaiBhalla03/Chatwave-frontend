import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {BiPowerOff} from "react-icons/bi";

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async()=>{
        localStorage.clear();
        navigate("/login");
    }
    return (
        <Button title={"logout"} onClick={handleClick}>
            <BiPowerOff/>
        </Button>
    );
};

const Button = styled.button`
    display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #273031;
  border: none;
  cursor: pointer;
  color: white;
`

export default Logout;