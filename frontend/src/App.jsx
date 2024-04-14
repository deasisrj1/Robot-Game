import { useState, useEffect } from "react";
import Game from "./components/Game";
import { LeaderBoard } from "./components/LeaderBoard";

function App() {
  return (
    <>
      <div className="nav">
        <h1>ROBOT GAME</h1>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Game />
      </div>
    </>
  );
}

export default App;
