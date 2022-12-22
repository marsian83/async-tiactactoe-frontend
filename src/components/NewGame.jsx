import axios from "axios";
import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NewGame = () => {
  //useRef hooks
  const email = useRef("");

  //misc hooks
  const { currentUser } = useAuth();

  //functions
  const startGame = () => {
    axios.post("/api/game/new", {
      player1: currentUser.email,
      player2: email.current.value,
    });
  };

  return (
    <div className={`container page`}>
      <Link to={`/`} className="btn-back">
        &lsaquo;
      </Link>
      <p className="color-primary align-start fw-700 my-1">Start a new game</p>
      <p className="heading" style={{ width: "100%" }}>
        Whom do you want to play with?
      </p>
      <div className="input">
        <p>Email</p>
        <input type="email" placeholder="Type their email here" ref={email} />
      </div>
      <button className="btn bg-primary my-5" onClick={startGame}>Start Game</button>
    </div>
  );
};

export default NewGame;
