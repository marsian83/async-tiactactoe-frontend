import { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
