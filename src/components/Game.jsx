import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GameCSS from "./Game.module.css";

const Game = (props) => {
  //decode url parameters
  const { id } = useParams();

  //useState hooks
  const [game, setGame] = useState({});
  const [gameState, setGameState] = useState("");
  const [opponent, setOpponent] = useState();

  //misc hooks
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  //useEffect hooks
  useEffect(() => {
    //Load game data
    if (!currentUser) {
      navigate("/");
    }
    LoadGameData();
  }, [currentUser]);

  useEffect(() => {
    if (!game.state) {
      return;
    }
    //decode the state every time game is updated
    const decodedState = game.state.split("/");
    if (decodedState[0] === "win") {
      if (decodedState[1] === "p1") {
        if (game.player1 === currentUser.username) {
          setGameState("You win");
        } else {
          setGameState("They win");
        }
      }
      if (decodedState[1] === "p2") {
        if (game.player2 === currentUser.username) {
          setGameState("You win");
        } else {
          setGameState("They win");
        }
      }
    }
    if (decodedState[0] === "wait") {
      if (decodedState[1] === "p1") {
        if (game.player1 === currentUser.username) {
          setGameState("Your move");
        } else {
          setGameState("Their move");
        }
      }
      if (decodedState[1] === "p2") {
        if (game.player2 === currentUser.username) {
          setGameState("Your move");
        } else {
          setGameState("Their move");
        }
      }
    }
    if (decodedState[0] === "draw") {
      setGameState("Draw");
    }
  }, [game]);

  //functions
  const LoadGameData = async () => {
    const { data } = await axios.get(`/api/game/info/${id}`);
    if (!data.result) {
      navigate("/");
    }
    setGame(data.result);
    if (data.result.player1 === currentUser.username) {
      setOpponent(data.result.player2);
    } else if (data.result.player2 === currentUser.username) {
      setOpponent(data.result.player1);
    } else {
      navigate("/");
    }
  };

  const playMove = async (box) => {
    const playChar = currentUser.username === game.player1 ? "x" : "o";
    await axios.put(`/api/game/play/${id}/${playChar} `, {
      box: box,
    });
    LoadGameData();
  };

  return (
    <>
      <Link className="btn-back" to={"/"}>
        &lsaquo;
      </Link>
      <p className="heading">Game with {opponent}</p>
      <p className="color-primary align-start fw-400 my-1">Your piece</p>
      <p className="game-piece">
        <img
          src={
            currentUser &&
            (game.player1 === currentUser.username ? "/cross.png" : "/not.png")
          }
          alt="game-piece"
          className={`game-piece`}
        />
      </p>
      <p className={`${GameCSS.turnHint}`}>{gameState}</p>
      <div className={`${GameCSS.board}`}>
        {game.board &&
          game.board.map((box, index) => {
            const p = box.toLowerCase();
            return (
              <div
                key={index}
                className={`${GameCSS.pieceBox}`}
                onClick={() => {
                  playMove(index);
                }}
              >
                {p === "x" ? (
                  <img src="/cross.png"></img>
                ) : p === "o" ? (
                  <img src="/not.png"></img>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Game;
