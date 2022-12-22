import React, { useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginCSS from "./Login.module.css";

const Login = () => {
    //useRef hooks
    const username = useRef("");
    const password = useRef("");
  
    //misc hooks
    const navigate = useNavigate();
    const { login } = useAuth();
  
    //Callback for handling submit action
    const signin = async () => {
      //call the authcontext signup function with given ref values
      await login(
        username.current.value,
        password.current.value
      );
  
      //navigate to home page after logged in
      navigate("/");
    };
  
  return (
    <div className={`container page`}>
      <Link to={`/`} className="btn-back">&lsaquo;</Link>
      <p className="color-primary align-start fw-700 my-1">Login</p>
      <p className="heading">Please enter your details</p>
      <div className="input">
        <p>Username</p>
        <input type="text" placeholder="Type your username here" ref={username}/>
      </div>
      <div className="input">
        <p>Password</p>
        <input type="password" placeholder="Type your password here" ref={password} />
      </div>
      <button className="btn bg-primary my-5" onClick={signin}>Login</button>
    </div>
  );
};

export default Login;
