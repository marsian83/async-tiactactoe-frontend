import React from "react";
import { useAuth } from "../contexts/AuthContext";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

const Home = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Dashboard /> : <LandingPage />;
};

export default Home;
