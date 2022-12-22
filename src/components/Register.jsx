import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RegisterCSS from "./Register.module.css";

const Register = () => {
  //useRef hooks
  const name = useRef("");
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");

  //misc hooks
  const navigate = useNavigate();
  const { signup } = useAuth();

  //Callback for handling submit action
  const register = async () => {
    //call the authcontext signup function with given ref values
    await signup(
      name.current.value,
      username.current.value,
      email.current.value,
      password.current.value
    );

    //navigate to home page after logged in
    navigate("/");
  };

  return (
    <div className={`container page`}>
      <Link to={`/`} className="btn-back">
        &lsaquo;
      </Link>
      <p className="color-primary align-start fw-700 my-1">Create account</p>
      <p className="heading">Let's get to know you better!</p>
      <div className="input">
        <p>Your name</p>
        <input type="text" placeholder="Type your name here" ref={name} />
      </div>
      <div className="input">
        <p>Username</p>
        <input
          type="text"
          placeholder="Type your username here"
          ref={username}
        />
      </div>
      <div className="input">
        <p>Email</p>
        <input type="text" placeholder="Type your email here" ref={email} />
      </div>
      <div className="input">
        <p>Password</p>
        <input
          type="password"
          placeholder="Type your password here"
          ref={password}
        />
      </div>
      <button className="btn bg-primary my-2" onClick={register}>
        Register
      </button>
    </div>
  );
};

export default Register;
