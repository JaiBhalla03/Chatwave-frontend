import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import Logo from '../assets/logo.svg'
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {loginRoute} from "../utils/APIRoutes";

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    })
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/");
        }
    }, [])
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {password, username} = values;
            const {data} = await axios.post(loginRoute, {
                username, password,
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/');
            }
        }
    }
    const handleChange = (event)=>{
        setValues(
            {...values, [event.target.name]: event.target.value}
        )
    }
    const handleValidation = ()=>{
        const {
            password, username
        } = values;
        if(password === ""){
            toast.error("email and password is required",toastOptions);
            return false;
        }
        else if(username.length === ""){
            toast.error(
                "Username and password is required", toastOptions
            );
            return false;
        }
        return true;
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className={'brand'}>
                        <img src={Logo} alt={'logo'}/>
                        <h1>chatwave</h1>
                    </div>
                    <input
                        type={"text"}
                        placeholder={'Username'}
                        name={'username'}
                        onChange={(e)=>handleChange(e)}
                        min="3"
                    />
                    <input
                        type={"password"}
                        placeholder={'Password'}
                        name={'password'}
                        onChange={(e)=>handleChange(e)}
                    />
                    <button type={'submit'}>Login</button>
                    <span>Don't have an account?
                     <Link to={'/register'}>
                      Register
                     </Link>
                 </span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0a0e0f;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }

  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #161b1c;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #202427;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #252b2e;
        outline: none;
      }
    }

    button {
      background-color: #202427;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.2s ease-in-out;

      &:hover {
        background-color: #252b2e;
      }
    }

    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #252b2e;
        margin-left: 0.5rem;
        text-decoration: none;
        font-weight: bold;
        transition: 0.2s ease-in-out;
        &:hover{
          color: #3a4042;
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Login;