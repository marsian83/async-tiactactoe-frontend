import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashboardCSS from "./Dashboard.module.css";
import GameCard from "./GameCard";

const Dashboard = () => {
  //useState hooks
  const [games, setGames] = useState([]);

  //misc hooks
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  //useEffect hooks
  useEffect(() => {
    //hook to load all games into the games state
    const fun = async () => {
      const { data } = await axios.get(
        `/api/game/user/${currentUser.username}`
      );
      setGames(data.result);
    };
    fun();
  }, []);

  return (
    <div className="page">
      <p className="heading">Your Games</p>
      {games.length > 0 ? (
        games.map((game) => <GameCard key={game._id} game={game} />)
      ) : (
        <div className={`${DashboardCSS.noGames}`}>
          <p>No Games Found</p>
          <button
            className="btn bg-primary"
            onClick={() => {
              navigate("/new-game");
            }}
          >
            Start a new game
          </button>
        </div>
      )}
      <button
        className={`${DashboardCSS.newGame}`}
        onClick={() => {
          navigate("/new-game");
        }}
      >
        + New Game
      </button>
    </div>
  );
};

export default Dashboard;
