import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Game = (props) => {
  //decode url parameters
  const { id } = useParams();

  //useState hooks
  const [game, setGame] = useState({});

  //misc hooks
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  //useEffect hooks
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    //Load game data
    LoadGameData();
  }, []);

  //functions
  const LoadGameData = async () => {
    const { data } = await axios.get(`/api/game/info/${id}`);
    if (!data.result) {
      navigate("/");
    }
    setGame(data.result);
    if (data.result.player1 === currentUser.username) {
      setGame((prev) => {
        return { ...prev, opponent: prev.player2 };
      });
    } else if (data.result.player2 === currentUser.username) {
      setGame((prev) => {
        return { ...prev, opponent: prev.player1 };
      });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Link className="btn-back" to={"/"}>
        &lsaquo;
      </Link>
      <p className="heading">Game with {game && game.opponent}</p>
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
    </>
  );
};

export default Game;
