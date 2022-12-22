import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GameCardCSS from "./GameCard.module.css";

const GameCard = (props) => {
  const { game } = props;

  //misc hooks
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  //mount
  const decodedState = game.state.split("/");
  if (decodedState[0] === "win") {
    if (decodedState[1] === "p1") {
      if (game.player1 === currentUser.username) {
        game.state = "You won!";
      } else {
        game.state = `${game.player1} won!`;
      }
    }
    if (decodedState[1] === "p2") {
      if (game.player2 === currentUser.username) {
        game.state = "You won!";
      } else {
        game.state = `${game.player2} won!`;
      }
    }
  }
  if (decodedState[0] === "wait") {
    if (decodedState[1] === "p1") {
      if (game.player1 === currentUser.username) {
        game.state = `${game.player2} made their move!\nWaiting for you`;
      } else {
        game.state = `You just made your move!\nWaiting for them!`;
      }
    }
    if (decodedState[1] === "p2") {
      if (game.player2 === currentUser.username) {
        game.state = `${game.player1} made their move!\nWaiting for you`;
      } else {
        game.state = `You just made your move!\nWaiting for them!`;
      }
    }
  }
  if (decodedState[0] === "draw") {
    game.state = "It's a draw";
  }

  const timestamp = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(game.updatedAt));

  return (
    <div className={`${GameCardCSS.card}`}>
      <p className={`${GameCardCSS.title}`}>
        Game with{" "}
        {game.player1 === currentUser.username ? game.player2 : game.player1}
      </p>
      <p className={`${GameCardCSS.state}`}>{game.state}</p>
      <p className={`${GameCardCSS.time}`}>{timestamp}</p>
      <button
        className="btn bg-primary py-1"
        onClick={() => {
          navigate(`/game/${game._id}`);
        }}
      >
        Play!
      </button>
    </div>
  );
};

export default GameCard;
