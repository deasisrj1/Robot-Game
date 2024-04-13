import { useState, useEffect } from "react";
import Game from "./components/Game";
import { LeaderBoard } from "./components/LeaderBoard";

function App() {
  const [leaderBoard, setLeaderBoard] = useState({
    highestScore: 0,
    lowestScore: 0,
    rankings: [],
  });
  const player = {
    name: "Player 1",
    robot: {
      skin: "Wall-E-icon.png",
      type: "robot",
      rotation: 180,
    },
  };

  useEffect(() => {
    const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
    if (leaderBoard) {
      setLeaderBoard(leaderBoard);
    }
  }, []);

  const handleTopScore = (username, score = 0) => {
    if (username && score) {
      let rankings = [...leaderBoard.rankings, { username, score }].sort(
        (a, b) => b.score - a.score
      );
      let highestScore = Math.max(leaderBoard?.highestScore, score);

      let newLeaderBoard = {
        highestScore,
        rankings,
      };

      setLeaderBoard(newLeaderBoard);

      localStorage.setItem("leaderBoard", JSON.stringify(newLeaderBoard));
    }
  };

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
        <Game
          player={player}
          leaderBoard={leaderBoard}
          handleTopScore={handleTopScore}
        />
      </div>
    </>
  );
}

export default App;
