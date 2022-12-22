import React from "react";
import { Link } from "react-router-dom";
import LandingPageCSS from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={`container page ${LandingPageCSS.body}`}>
      <div className={`container ${LandingPageCSS.branding}`}>
        <h3>async</h3>
        <h2>tic tac toe</h2>
      </div>
      <Link to={`/login`} className={`btn bg-primary ${LandingPageCSS.login}`}>Login</Link>
      <Link to={`/register`} className={`btn bg-secondary ${LandingPageCSS.register}`}>Register</Link>
    </div>
  );
};

export default LandingPage;
